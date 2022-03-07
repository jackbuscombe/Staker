import { useState, useEffect, forwardRef } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Center, Anchor, Image, Button, Avatar, Grid, Menu, Divider, Text, Group, UnstyledButton, UnstyledButtonProps, Header } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { TiTickOutline } from "react-icons/ti";
import { GiConfirmed, GiCalendar } from "react-icons/gi";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosUnlock, IoIosLogOut } from "react-icons/io";
import { GrFormView } from "react-icons/gr";

const chains = [
	{ name: "Binance Smart Chain Mainnet", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" },
	{ name: "Binance Smart Chain Testnet", logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" },
];

const UserButton = forwardRef(({ account, icon, ...others }, ref) => (
	<UnstyledButton
		ref={ref}
		sx={(theme) => ({
			display: "block",
			width: "100%",
			padding: theme.spacing.md,
			color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

			"&:hover": {
				backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
			},
		})}
		{...others}
	>
		<Group>
			<Avatar src={null} radius="xl" color="indigo" />
			<div style={{ flex: 1 }}>
				<Text size="sm" weight={500}>
					Account
				</Text>

				<Text color="dimmed" size="xs">
					{account.substring(0, 4)}...{account.substring(account.length - 4, account.length)}
				</Text>
			</div>

			{icon || <FiChevronDown />}
		</Group>
	</UnstyledButton>
));

export const Navbar = () => {
	const notifications = useNotifications();
	const { Moralis, user, isAuthenticated, logout, authenticate, web3, enableWeb3, isWeb3Enabled, account } = useMoralis();
	const { switchNetwork, chainId, chain } = useChain();
	const [chainLogo, setChainLogo] = useState();

	const handleAuthenticate = async () => {
		if (user) {
			await logout();
			handleAuthToast(false);
		} else {
			await authenticate({ signingMessage: "Sign This Message To Log In And Prove You Hold The Private Keys To This Wallet. This will not cost you any gas." });
			handleAuthToast(true);
		}
	};

	const handleAuthToast = async (loggingIn) => {
		if (loggingIn) {
			notifications.showNotification({
				title: "Logged In",
				message: "You have successfully logged in.",
				color: "teal",
				icon: <TiTickOutline />,
			});
		} else if (!loggingIn) {
			notifications.showNotification({
				title: "Logged Out!",
				message: "You have successfully logged out.",
				color: "red",
				icon: <TiTickOutline />,
			});
		}
		return;
	};

	useEffect(() => {
		enableWeb3();
	}, []);

	useEffect(() => {
		enableWeb3;
		if (!chain || !isWeb3Enabled || !isAuthenticated) {
			return false;
		}

		for (let i = 0; i < chains.length; i++) {
			if (chain.name != "Binance Smart Chain Mainnet" || chain.name != "Binance Smart Chain Testnet") {
				switchNetwork("56");
				return true;
			}
		}
	}, [isWeb3Enabled, chain]);

	return (
		<div id="navbar">
			<Grid justify="space-between" align="center">
				<Grid.Col span={1}>
					<Image src="https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" width={40} height={40} />
				</Grid.Col>
				<Grid.Col span={2}>
					<Anchor href="#" mr="12px" color="gray">
						Stake
					</Anchor>
					<Anchor href="#" color="gray">
						My Stakes
					</Anchor>
				</Grid.Col>
				{isAuthenticated && chain && (
					<Grid.Col span={4} mr="18px">
						<Button variant="outline">
							<Image src={chain.name == "Binance Smart Chain Mainnet" ? "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850" : null} width={20} height={20} mr="12px" />
							Connected To {chain.name}
						</Button>
					</Grid.Col>
				)}

				{isAuthenticated && account ? (
					<Grid.Col span={4}>
						<Group position="center">
							<Menu withArrow placement="center" control={<UserButton account={account} />}>
								<Menu.Label>Stake Options</Menu.Label>
								<Menu.Item icon={<IoIosLogOut />}>Current Stakes</Menu.Item>
								<Divider />
								<Menu.Label>Account</Menu.Label>
								<Menu.Item onClick={logout} color="red" icon={<IoIosLogOut />}>
									Logout
								</Menu.Item>
							</Menu>
						</Group>
					</Grid.Col>
				) : (
					<Button onClick={handleAuthenticate} variant="filled">
						Connect Wallet
					</Button>
				)}
			</Grid>
		</div>
	);
};
