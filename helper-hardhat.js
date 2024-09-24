const networkConfig = {
  31337: {
    name: "localhost",
  },

  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "",
  },
};
const INITAIL_SUPPLY = "1000000000000000000000000";

const developmentChains = ["localhost", "hardhat"];

module.exports = { developmentChains, INITAIL_SUPPLY, networkConfig };
