import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";

import { Header } from "../components/Header";
import { AppProvider } from "../contexts";

import { getWeb3Library } from "../config/getWeb3LibraryProvider";
import { theme } from "../styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <Header />

          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}
