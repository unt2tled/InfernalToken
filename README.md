# InfernalToken

**The most evil token ever created.**  
Welcome to the official internal token of Hell. This project is a demonstration of ERC20 token mechanics with a devilish twist, built using Hardhat and OpenZeppelin.

---


## About

InfernalToken is not just any ERC20 token—it's cursed!  
- **Special transfer logic:** If the last digit of the transfer value is 6, the amount is multiplied by 6.
- **Requesting tokens:** Anyone can request a token by sending at least 66,666 wei to the contract.
- **Owner-only minting:** Only the contract owner can mint new tokens (if enabled).

---

## Getting Started

1. Install dependencies:
    ```sh
    npm install
    ```
2. Compile contracts:
    ```sh
    npm run compile
    ```
3. Run tests:
    ```sh
    npm test
    ```
4. Deploy to testnet (Sepolia):
    ```sh
    npm run deploy:test
    ```
5. Reset deployment state (if needed):
    ```sh
    npm run reset:test
    ```

---

**Abandon all hope, ye who enter here.**