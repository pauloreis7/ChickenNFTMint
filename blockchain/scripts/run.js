const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('ChickenNFT')
  const nftContract = await nftContractFactory.deploy()

  await nftContract.deployed()
  console.log('Contract deployed to:', nftContract.address)

  let mintNFT = await nftContract.makeAChickenNFT()

  await mintNFT.wait()

  let mintSecondNFT = await nftContract.makeAChickenNFT()

  await mintSecondNFT.wait()
}

const runMain = async () => {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runMain()
