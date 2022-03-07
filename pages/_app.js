import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { MoralisProvider } from "react-moralis";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";

const appId = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_APP_ID;
const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_SERVER_URL;

const config = {
	initialColorMode: "dark",
};

function MyApp({ Component, pageProps }) {
	return (
		<MoralisProvider appId={appId} serverUrl={serverUrl}>
			<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
				<NotificationsProvider>
					<Navbar />
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
		</MoralisProvider>
	);
}

export default MyApp;
