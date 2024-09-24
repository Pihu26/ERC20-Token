const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains, INITAIL_SUPPLY } = require("../helper-hardhat");
const { assert, expect } = require("chai");
const { utils } = require("ethers");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Our Token Contract", async function () {
      let ourToken;
      let multiply = 10 ** 18;
      const user1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
      const deployer = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

      beforeEach(async function () {
        // const accounts = await getNamedAccounts();
        // deployer = accounts.deployer;
        // user1 = accounts.user1;
        // const [deployer, user1] = await ethers.getSigners();
        // console.log(user1.address);
        // console.log(deployer.address);

        await deployments.fixture("all");
        ourToken = await ethers.getContract("OurToken", deployer);
      });
      it("deloyerd", async () => {
        assert(ourToken.address);
      });

      describe("constructor", () => {
        it("Initale supply of token is correct", async () => {
          const total = await ourToken.totalSupply();
          assert.equal(total.toString(), INITAIL_SUPPLY);
        });
        it("its correct nameof token ", async () => {
          const name = (await ourToken.name()).toString();
          const short = (await ourToken.symbol()).toString();
          assert.equal(name, "OurToken");
          assert.equal(short, "OT");
        });
      });
      describe("Transfer", () => {
        it("should be able to transfer correctly", async () => {
          const tokenSupply = ethers.utils.parseEther("10");
          await ourToken.transfer(user1, tokenSupply);
          expect(await ourToken.balanceOf(user1)).to.equal(tokenSupply);
        });
        it("emit transfer event ", async () => {
          await expect(
            ourToken.transfer(user1, (10 * multiply).toString())
          ).to.emit(ourToken, "Transfer");
        });
      });
      describe("Alllowance", () => {
        const amount = (20 * multiply).toString();
        beforeEach(async () => {
          playerToken = await ethers.getContract("OurToken", user1);
        });
        it("should allow spend", async () => {
          const spend = ethers.utils.parseEther("5");
          await ourToken.approve(user1, amount);
          await playerToken.transferFrom(deployer, user1, spend);
          expect(await playerToken.balanceOf(user1)).to.equal(spend);
        });
      });
    });
