// Setup
const { Network, Alchemy } = require('alchemy-sdk');
const { ethers } = require('hardhat');
const hre = require("hardhat");
require('dotenv').config();

// create an account on: https://www.alchemy.com/, create an app
// use your own api key

const settings = {
    apiKey: process.env.ALCHEMY_PK_ETH,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// Function used to fetch the addresses
// As a params you have to use an array of contractAddresses (NFT collection)
// I didn't find a way to qualify these addresses in a efficient way.
// Exemple addresses owning more than 2 NFT for each collection.
// One way might be contractInstance.balanceOf(address)
// DM me if you found a way or nee tips to start
module.exports =  async function getOwners(contractAddresses) {

  let ownersNftCollections = [];
  let doublon = [];
  let deadAddresses = [];

  for (let i = 0; i < contractAddresses.length; i++) {

    // We fetch all the owners of the NFT collection addresss
    const owners = await (await alchemy.nft.getOwnersForContract(contractAddresses[i])).owners;
    for (let i = 0; i < owners.length; i++) {

      // avoid doublon, some owners own nft of every collection
      if (ownersNftCollections.includes(owners[i])) {
        doublon.push(owners[i]);
      } else {
        // avoid invalid address like 0X00000... need to find better regexp
          if (owners[i].match(/0x000000000000000000000000000000000000dead/g) ||
          owners[i].match(/0x0000000000000000000000000000000000000000/g)) {
            deadAddresses.push(owners[i]);
          } else {
            ownersNftCollections.push(owners[i])
          }

          // stop at 10k addresses
          if (ownersNftCollections.length > 9999) {break;};
      }
    };
  };

  console.log(`${ownersNftCollections.length} collected, ${doublon.length} doublon deleted, ${deadAddresses.length} dead addresses deleted`);
  return ownersNftCollections;
}
