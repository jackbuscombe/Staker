import { useState, useEffect } from "react";
import { Button, Badge, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNotifications } from "@mantine/notifications";
import { GiConfirmed, GiCalendar } from "react-icons/gi";
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";
import { BsBank } from "react-icons/bs";

export const StakeForm = ({ stakeAmount, setStakeAmount, endDate, setEndDate }) => {
	const notifications = useNotifications();
	const [accountBalance, setAccountBalance] = useState(0);
	const [isStaking, setIsStaking] = useState(false);

	const dateParser = (dateString) => new Date(Date.parse(dateString));

	const confirmStake = () => {
		setIsStaking(true);
		notifications.showNotification({ title: "Confirming Stake", message: "Confirm stake with your wallet.", loading: true });
		console.log(endDate);
		try {
			//Do Stake
			setTimeout(() => {
				notifications.showNotification({ title: "Stake Successful", message: "Your stake was successful.", color: "teal", icon: <TiTickOutline /> });
			}, 3000);
		} catch {
			setIsStaking(false);
			notifications.showNotification({ title: "Stake Failed", message: "Your stake failed to submit. Refresh and try again.", color: "red", icon: <TiTimesOutline /> });
		}
		setIsStaking(false);
	};

	return (
		<>
			<NumberInput
				value={stakeAmount}
				onChange={(val) => setStakeAmount(val)}
				label="Stake Amount"
				placeholder="Stake Amount In BUSD"
				description={`Balance: ${accountBalance}`}
				required
				hideControls
				size="lg"
				rightSection={
					<Button onClick={() => setStakeAmount(accountBalance)} variant="outline" mr="44px">
						MAX
					</Button>
				}
				mb="22px"
				icon={<BsBank fontColor="white" color size="24px" />}
			/>
			<DatePicker label="Stake Length" placeholder="Select End Stake Date" value={endDate} onChange={setEndDate} size="lg" mb="22px" required icon={<GiCalendar size="24px" />} />
			<Button onClick={() => confirmStake()} leftIcon={<GiConfirmed size={14} />} loaderPosition="right" size="lg">
				{isStaking ? "Submitting Stake" : "Confirm Stake"}
			</Button>
		</>
	);
};
