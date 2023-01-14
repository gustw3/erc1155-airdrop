const getOwners = require("./fetchAddresses");
const { Network, Alchemy } = require('alchemy-sdk');
const { ethers } = require('hardhat');
const abi = require("../abi/abi")
const hre = require("hardhat");
require('dotenv').config();


// set-up alchemy
const settings = {
    apiKey: process.env.ALCHEMY_PK_MATIC,
    network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);


// define the collections we target
const collections = ["0xED5AF388653567Af2F388E6224dC7C4b3241C544", "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"];

// set up the provider wich allow you to connect with ethereum
// replace maticmum by your target network (see on ether.js website)
// replace the second argument by your api key.
const provider = new ethers.providers.AlchemyProvider( "matic", process.env.ALCHEMY_PK_MATIC);
const signer = new ethers.Wallet(process.env.PK, provider);

const contractInstance = new ethers.Contract("0x986A0d72567f82c02b6afF77836A15Da0A508A43", abi, signer);

  async function main() {
    const owners = await getOwners(collections);
    let batchs = [];

    // I tested the code, currently that's safe to airdrop 600 nft per transaction
    // increase if you want
    let n = 600;
    // create batch of 600 addresses
    while (owners.length > 600) {
      const batch  = owners.slice(0, 600);
      batchs.push(batch);
      for (let i = 0; i < n; i++) {owners.shift()}
      if (owners.length <= 600 && owners.length >= 1) {
        batchs.push(owners);
        break;
      }
    }

    // get gas price
    let gas = await provider.getGasPrice()

    let receipts = [];
    for (let i = 0; i < batchs.length; i++) {
      console.log(1);
      let tx = await contractInstance.airdrop(batchs[i], 1, {
        gasPrice: gas
      });
      let receipt = await tx.wait();
      receipts.push(receipt);
    }

    // log transactions and receipts for each airdrop if you want
    console.log(receipts);
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
