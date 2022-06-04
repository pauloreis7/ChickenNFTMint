import { Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";

export default function Home() {
  return (
    <Flex w="100%" h="100%" direction="column" alignItems="center" pb="8">
      <Head>
        <title>Chicken NFT Mint</title>
        <meta name="description" content="Mint an epic chicken NFT" />
      </Head>

      <ConnectWalletModal />

      <WalletProfileModal />

      <Flex
        as="main"
        w="100%"
        h="100%"
        maxWidth="7xl"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={["6", "8", "12"]}
        mt="6"
      >
        <Heading
          mb="6"
          fontSize={["4xl", "4xl", "6xl"]}
          color="orange.500"
          fontWeight="700"
          textTransform="capitalize"
        >
          Chicken NFT Mint
        </Heading>

        <Text
          fontSize={["xl", "xl", "2xl"]}
          color="gray.300"
          fontWeight="400"
          textTransform="capitalize"
        >
          Each unique. Each beautiful. Discover your NFT today.
        </Text>
      </Flex>
    </Flex>
  );
}
