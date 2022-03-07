import { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import { Table, Button } from "@mantine/core";
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";

const elements = [
	{ start: 1641441185, end: 1646045585, principal: 200, currentValue: 20, finalValue: 220, timeLeft: 2 },
	{ start: 1641417985, end: 1646345585, principal: 200, currentValue: 18, finalValue: 220, timeLeft: 0 },
	{ start: 1641427385, end: 1646445585, principal: 200, currentValue: 9.5, finalValue: 220, timeLeft: -2 },
	{ start: 1641401485, end: 1646745585, principal: 500, currentValue: 26, finalValue: 220, timeLeft: 2 },
	{ start: 1641047985, end: 1646945585, principal: 500, currentValue: 12, finalValue: 220, timeLeft: 2 },
];

const convertUnixToDate = (timestamp) => {
	return new Date(timestamp * 1000).toDateString("en-US");
};

const calculateTimeRemaining = (timestamp) => {
	return timestamp - Math.floor(Date.now() / 1000);
};

export const UnstakeForm = () => {
	const notifications = useNotifications();

	const [isEndStaking, setIsEndStaking] = useState(false);

	const endStake = () => {
		setIsEndStaking(true);

		notifications.showNotification({ title: "Confirming End Stake", message: "Confirm end stake with your wallet.", loading: true });

		try {
			setTimeout(() => {
				//Do Stake
				notifications.showNotification({ title: "End Stake Successful", message: "Your stake was successfully withdrawn", color: "teal", icon: <TiTickOutline /> });
			}, 3000);
		} catch {
			setIsEndStaking(false);
			notifications.showNotification({ title: "End Stake Failed", message: "There was an error ending your stake. Refresh the page and try again.", color: "red", icon: <TiTimesOutline /> });
		}
		setIsEndStaking(false);
	};

	const rows = elements.map((element) => (
		<tr key={element.name}>
			<td>{convertUnixToDate(element.start)}</td>
			<td>{convertUnixToDate(element.end)}</td>
			<td>{element.principal} BUSD</td>
			<td>{element.currentValue} BUSD</td>
			<td>{element.finalValue} BUSD</td>
			<td>{calculateTimeRemaining(element.end) > 0 ? `${(calculateTimeRemaining(element.end) / 86400).toFixed()} Days` : "Complete"}</td>
			<td>
				<Button onClick={() => endStake()} variant="gradient" gradient={{ from: calculateTimeRemaining(element.end) > 0 ? "red" : "indigo", to: calculateTimeRemaining(element.end) > 0 ? "pink" : "cyan", deg: 35 }}>
					{calculateTimeRemaining(element.end) > 0 ? "End Stake Early" : "End Stake"}
				</Button>
			</td>
		</tr>
	));

	return (
		<Table striped highlightOnHover verticalSpacing="lg">
			<thead>
				<tr>
					<th>Start</th>
					<th>End</th>
					<th>Principal</th>
					<th>Current Value</th>
					<th>Final Value</th>
					<th>Time Left</th>
					<th>End Stake</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
