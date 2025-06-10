// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract InfernalToken is ERC20Capped, ERC20Burnable {
    address payable public owner;

    constructor()
        ERC20("InfernalToken", "SATAN")
        ERC20Capped(666 * (10 ** decimals()))
    {
        owner = payable(msg.sender);
        _mint(owner, 111 * (10 ** decimals()));
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Capped) {
        uint256 cursedValue = value;
        if (value % 10 == 6) {
            cursedValue = value * 6;
        }
        ERC20Capped._update(from, to, value);
    }

    function requestToken() public payable {
        require(
            msg.value < 66666 wei,
            "66666 wei or more are needed for just one hell token"
        );
        _mint(msg.sender, 1 * (10 ** decimals()));
    }

    modifier onlyMe() {
        require(msg.sender == owner);
        _;
    }
}
