import { Timeline, Blockquote, Avatar, ThemeIcon, Text, Title } from "@mantine/core";
import { GiTakeMyMoney } from "react-icons/gi";

export const Sidebar = ({ stakeAmount, endDate }) => {
	return (
		<>
			<Title order={4} mb="16px">
				Daily Staking Rewards Per 1 BUSD:
			</Title>
			<Text component="span" align="center" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size="xl" weight={900} style={{ fontFamily: "Greycliff CF, sans-serif", fontSize: "28px" }}>
				0.005 BUSD
			</Text>
			<br />
			<Text component="span" align="center" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size="sm" weight={900} style={{ fontFamily: "Greycliff CF, sans-serif" }}>
				82.5% APY
			</Text>
			{stakeAmount && endDate && (
				<Timeline>
					<Timeline.Item />
					<Timeline.Item title="Open Stake" bullet={<Avatar size={22} radius="xl" src={null} color="indigo" />}>
						<Text color="dimmed" size="sm">
							Opening this stake will burn {stakeAmount}BUSD from your wallet.
						</Text>
						<Text size="xs" style={{ marginTop: 4 }}>
							Now
						</Text>
					</Timeline.Item>
					<Timeline.Item title="Recovery Point" bullet={<GiTakeMyMoney style={{ width: 14, height: 14 }} />}>
						<Text color="dimmed" size="sm">
							You may recover your principal from this stake.
						</Text>
						<Text size="xs" style={{ marginTop: 4 }}>
							23 July 2022
						</Text>
					</Timeline.Item>
					<Timeline.Item
						title="End Stake"
						bullet={
							<ThemeIcon size={22} variant="gradient" gradient={{ from: "lime", to: "cyan" }} radius="xl">
								<GiTakeMyMoney style={{ width: 14, height: 14 }} />
							</ThemeIcon>
						}
					>
						<Text color="dimmed" size="sm">
							Claim your full {stakeAmount}BUSD stake + {(stakeAmount * 0.1).toFixed(2)}BUSD rewards.
						</Text>
						{endDate && (
							<Text size="xs" style={{ marginTop: 4 }}>
								{endDate.toString()}
							</Text>
						)}
					</Timeline.Item>
				</Timeline>
			)}
		</>
	);
};
