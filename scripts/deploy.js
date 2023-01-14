const hre = require("hardhat");

async function main() {

  const Cheers = await hre.ethers.getContractFactory("Cheers");
  const cheers = await Cheers.deploy();

  await cheers.deployed();


  console.log(
    `Contract deployed to ${cheers.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
