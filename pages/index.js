import Head from "next/head";
import { Grid } from "@mantine/core";
import { useState } from "react";
import { MainSection } from "../components/MainSection";
import { Sidebar } from "../components/Sidebar";

export default function Home() {
	const [stakeAmount, setStakeAmount] = useState();
	const [endDate, setEndDate] = useState(new Date());
	return (
		<div>
			<Head>
				<title>Staker App</title>
				<meta name="description" content="Staking Application" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid justify="center" mt="40px">
				<Grid.Col span={2}>
					<Sidebar stakeAmount={stakeAmount} endDate={endDate} />
				</Grid.Col>
				<Grid.Col span={5} offset={1}>
					<MainSection stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} endDate={endDate} setEndDate={setEndDate} />
				</Grid.Col>
			</Grid>
		</div>
	);
}
