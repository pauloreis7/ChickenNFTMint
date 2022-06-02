
async function main() {
  const contractFactory = await hre.ethers.getContractFactory("Greeter");
  const greeterContract = await contractFactory.deploy("Hello, Hardhat!");

  await greeterContract.deployed();

  console.log("Greeter deployed to:", greeterContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
