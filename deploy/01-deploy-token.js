const { network } = require("hardhat");
const { INITAIL_SUPPLY, developmentChains } = require("../helper-hardhat");
const { verify } = require("../hardhat-helper-verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  const arguments = [INITAIL_SUPPLY]
  const ourToken = await deploy("OurToken", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmation: network.config.blockConfirmations || 1,
  });
  const tokAddress = ourToken.address;
  log(`ourToken is deployed at${ourToken.address}`);
  log(INITAIL_SUPPLY);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEYS
  ) {
    await verify (ourToken.address,arguments)
  }
};

module.exports.tags = ["all", "token"];
