import {
  Button,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import Link from "next/link";

import chickenNFTABI from "../config/ChickenNFT.json";

import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";
import { MintSuccessModal } from "../components/MintSuccessModal";

const CONTRACT_ADDRESS = "0xD68aD3DABDD668b8638ce8D8d364B3e5450581e2";
const OPEN_SEA_COLLECTION_LINK =
  "https://testnets.opensea.io/collection/squarenft-66aojqiwni";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleMint() {
    setIsLoading(true);

    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          chickenNFTABI.abi,
          signer
        );

        console.log("pop wallet to pay gas...");
        let nftTxn = await connectedContract.makeAChickenNFT();

        console.log("wait mining...");
        await nftTxn.wait();

        toast({
          title: "NFT successfully minted",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log({ err });

      toast({
        title: "Mint error, try again",
        description: (err as Error).message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex w="100%" h="100%" direction="column" alignItems="center" pb="8">
      <Head>
        <title>Chicken NFT Mint</title>
        <meta name="description" content="Mint an epic chicken NFT" />
      </Head>

      <ConnectWalletModal />

      <WalletProfileModal />

      <MintSuccessModal contractAddress={CONTRACT_ADDRESS} />

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
          mb="6"
          fontSize={["xl", "xl", "2xl"]}
          color="gray.300"
          fontWeight="400"
          textTransform="capitalize"
        >
          Each unique. Each beautiful. Discover your NFT today.
        </Text>

        <Button
          onClick={handleMint}
          isLoading={isLoading}
          loadingText="Minting"
          mb="6"
          px="12"
          py="8"
          colorScheme="orange"
          fontSize="2xl"
        >
          Mint NFT
        </Button>

        <Link href={OPEN_SEA_COLLECTION_LINK} passHref>
          <ChakraLink
            isExternal
            display="flex"
            textAlign="center"
            fontSize="lg"
            color="blue.500"
          >
            🌊 View Collection on OpenSea
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
  );
}
