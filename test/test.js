const { ethers } = require("hardhat");
const hre = require("hardhat");


describe("Test Cheers", function () {
  let contract;
  let owner;
  let signers = [];

  before(async function () {
    owner = await ethers.getSigners();
    const amount = 600;
    for (let i = 0; i < amount; i++) {
      signers.push(ethers.Wallet.createRandom().address)
    }

    const Contract = await ethers.getContractFactory('Cheers');
    contract = await Contract.deploy();
  })

  it("Should show how much gas we need to airdrop 600 nfts", async function () {
    let amount2 =  17
    for (let i = 0; i < amount2; i++) {
      await contract.airdrop(signers, 1);
    }

  });
})
