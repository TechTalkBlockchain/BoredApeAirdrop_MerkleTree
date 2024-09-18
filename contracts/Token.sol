// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApeToken is ERC20("ApeToken", "APT") {
    address creator;

    constructor() {merkleRoot
        creator = msg.sender;
        _mint(msg.sender, 1000e18);
    }

    function mint(uint _amount) external {
        require(msg.sender == creator, "you are not creator");
        _mint(msg.sender, _amount * 1e18);
    }
}
