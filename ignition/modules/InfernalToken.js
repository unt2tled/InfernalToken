const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const InfernalTokenModule = buildModule("InfernalToken", (m) => {
  const token = m.contract("InfernalToken");

  return { token };
});

module.exports = InfernalTokenModule;
