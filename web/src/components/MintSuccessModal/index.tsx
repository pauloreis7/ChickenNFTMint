import {
  ScaleFade,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";

import chickenNFTABI from "../../config/ChickenNFT.json";

import { useWallet } from "../../contexts/WalletContext";

type MintSuccessModalProps = {
  contractAddress: string;
};

export function MintSuccessModal({ contractAddress }: MintSuccessModalProps) {
  const { mintSuccessModalIsOpen, setMintSuccessModalIsOpen } = useWallet();

  const [mintedTokenId, setMintedTokenId] = useState<any>(null);

  function handleSetMintedToken(from: any, tokenId: any) {
    const formattedTokenId = tokenId.toNumber();

    console.log(from, formattedTokenId);

    setMintedTokenId(formattedTokenId);

    setMintSuccessModalIsOpen(true);
  }

  useEffect(() => {
    const { ethereum } = window as any;

    if (!ethereum) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const connectedContract = new ethers.Contract(
      contractAddress,
      chickenNFTABI.abi,
      signer
    );

    try {
      connectedContract.on("NewChickenNFTMinted", handleSetMintedToken);

      console.log("setup event listener!");
    } catch (error) {
      console.log(error);
    }

    return () => {
      connectedContract.off("NewChickenNFTMinted", handleSetMintedToken);
    };
  }, []);

  return (
    <ScaleFade initialScale={2} in={mintSuccessModalIsOpen}>
      <Modal
        onClose={() => setMintSuccessModalIsOpen(false)}
        isOpen={mintSuccessModalIsOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay zIndex={10} />

        <ModalContent bg="gray.800" borderRadius="0.5rem">
          <ModalHeader p="3" mb="6" bg="gray.900" borderRadius="0.5rem">
            <Heading fontSize="xl">Mint Success</Heading>
          </ModalHeader>

          <ModalCloseButton size="0.5rem" top="4" right="4" />

          <ModalBody px="12" pb="6">
            <Heading mb="4" fontSize="xl">
              Hey there! NFT sent it to your wallet. It may be blank right now.
            </Heading>

            <Text mb="4" fontSize="lg">
              It can take a max of 10 min to show up on OpenSea.
            </Text>

            {mintedTokenId && (
              <Link
                href={`https://testnets.opensea.io/assets/${contractAddress}/${mintedTokenId}`}
                passHref
              >
                <ChakraLink
                  isExternal
                  display="flex"
                  textAlign="center"
                  fontSize="xl"
                  color="blue.500"
                >
                  This is the link
                </ChakraLink>
              </Link>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
}
