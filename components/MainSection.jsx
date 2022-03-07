import { Tabs } from "@mantine/core";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { StakeForm } from "../components/StakeForm";
import { UnstakeForm } from "../components/UnstakeForm";

export const MainSection = ({ stakeAmount, setStakeAmount, endDate, setEndDate, ...props }) => {
	return (
		<div id="main-container">
			<Tabs>
				<Tabs.Tab label="Stake" icon={<GiPayMoney />}>
					<StakeForm stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} endDate={endDate} setEndDate={setEndDate} />
				</Tabs.Tab>
				<Tabs.Tab label="Unstake" icon={<GiReceiveMoney />}>
					<UnstakeForm />
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
