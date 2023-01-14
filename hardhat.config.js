require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('hardhat-gas-reporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    matic: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PK]
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGON_PK
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: process.env.CMC_KEY,
    token: "MATIC"
  }
};
