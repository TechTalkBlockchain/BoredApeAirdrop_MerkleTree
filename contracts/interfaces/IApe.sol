// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


interface IApe {

     function withdrawRemainingTokens() external;
     function ClaimAirdrop(bytes32[] memory proof, uint256 amount) external;
}