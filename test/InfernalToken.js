const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InfernalToken", function () {
    let InfernalToken;
    let infernalToken;
    let owner;
    let addr1;

    beforeEach(async function () {
        InfernalToken = await ethers.getContractFactory("InfernalToken");
        [owner, addr1] = await ethers.getSigners();
        infernalToken = await InfernalToken.deploy();
    });

    it("should have the correct name and symbol", async function () {
        expect(await infernalToken.name()).to.equal("InfernalToken");
        expect(await infernalToken.symbol()).to.equal("SATAN");
    });

    it("should assign initial supply to owner", async function () {
        const ownerBalance = await infernalToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(ethers.parseUnits("111", await infernalToken.decimals()));
    });

    it("should transfer tokens correctly", async function () {
        // Owner transfers tokens to addr1
        await infernalToken.connect(owner).transfer(addr1.address, 50);
        expect(await infernalToken.balanceOf(addr1.address)).to.equal(50);
        const expected = (await ethers.parseUnits("111", await infernalToken.decimals())) - 50n; // 50n is BigInt
        expect(await infernalToken.balanceOf(owner.address)).to.equal(expected);
    });

    it("should allow requestToken with less than 66666 wei", async function () {
        const tx = await infernalToken.connect(addr1).requestToken({ value: 1000 });
        await tx.wait();
        expect(await infernalToken.balanceOf(addr1.address)).to.equal(ethers.parseUnits("1", await infernalToken.decimals()));
    });

    it("should revert requestToken with 66666 wei or more", async function () {
        await expect(
            infernalToken.connect(addr1).requestToken({ value: 66666 })
        ).to.be.revertedWith("66666 wei or more are needed for just one hell token");
    });
});