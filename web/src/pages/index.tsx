import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Flex w="100%" h="100%" direction="column" alignItems="center" pb="8">
      <Head>
        <title>Chicken NFT Mint</title>
        <meta name="description" content="Mint an epic chicken NFT" />
      </Head>

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
          fontSize={["4xl", "4xl", "6xl"]}
          color="orange.500"
          fontWeight="700"
          textTransform="capitalize"
        >
          Chicken NFT Mint
        </Heading>
      </Flex>
    </Flex>
  );
}
