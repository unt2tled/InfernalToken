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
        // Owner transfers 16 tokens to addr1 (16 % 10 == 6)
        const decimals = await infernalToken.decimals();
        const initialOwnerBalance = await infernalToken.balanceOf(owner.address);

        await infernalToken.connect(owner).transfer(addr1.address, 16);

        // The transfer should multiply 16 by 6 = 96 tokens (if the contract logic is correct)
        // But ERC20Capped._update is called with original value, so only 16 is transferred unless contract is changed
        // We'll check if the balance reflects the multiplied value (if implemented)
        const addr1Balance = await infernalToken.balanceOf(addr1.address);

        // If your contract multiplies the transfer, this should be 96
        // If not, this will be 16 (default ERC20 behavior)
        expect(addr1Balance).to.equal(96); // Change to 16 if contract does not actually multiply
        // Also check owner's balance decreased by 96
        const ownerBalance = await infernalToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(initialOwnerBalance - 96n); // Change to 16n if contract does not actually multiply
    });
});