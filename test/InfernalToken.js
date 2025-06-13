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
        await infernalToken.connect(owner).transfer(addr1.address, 50000000000000000000n); // 50 tokens
        expect(await infernalToken.balanceOf(addr1.address)).to.equal(50000000000000000000n);
        const expected = (await ethers.parseUnits("111", await infernalToken.decimals())) - 50000000000000000000n;
        expect(await infernalToken.balanceOf(owner.address)).to.equal(expected);
    });

    it("should allow requestToken with more than 66666 wei", async function () {
        const tx = await infernalToken.connect(addr1).requestToken({ value: 66666 });
        await tx.wait();
        expect(await infernalToken.balanceOf(addr1.address)).to.equal(ethers.parseUnits("1", await infernalToken.decimals()));
    });

    it("should revert requestToken with less than 66666 wei", async function () {
        await expect(
            infernalToken.connect(addr1).requestToken({ value: 66665 })
        ).to.be.revertedWith("66666 wei or more are needed for just one hell token");
    });

    it("should multiply transfer value by 6 if last digit is 6", async function () {
        const decimals = await infernalToken.decimals();
        const initialOwnerBalance = await infernalToken.balanceOf(owner.address);

        await infernalToken.connect(owner).transfer(addr1.address, 16000000000000000000n);
        const addr1Balance = await infernalToken.balanceOf(addr1.address);

        expect(addr1Balance).to.equal(96000000000000000000n);
        const ownerBalance = await infernalToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(initialOwnerBalance - 96000000000000000000n);
    });
});