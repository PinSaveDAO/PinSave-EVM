require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      evmVersion: "cancun",
    },
  },
  networks: {
    bsc: {
      url: "https://bscrpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56,
    },
    canto: {
      url: "https://canto.slingshot.finance/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 7700,
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5001,
    },
    filecoin: {
      url: "https://rpc.ankr.com/filecoin",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 314,
    },
    optimism: {
      url: "https://rpc.ankr.com/optimism",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 10,
    },
    BOT:{
      url: "https://rpc.botchain.ai",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 677,
    }
  },
  gasReporter: {
    enabled: true,
    currency: "CHF",
    gasPrice: 21,
  },
  etherscan: {
    apiKey: { optimisticEthereum: "XXJVCGBBP9MWQVTCU4NMJ5PT3Z9IH3IWP8" },
  },
};
