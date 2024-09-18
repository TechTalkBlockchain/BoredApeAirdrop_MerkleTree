// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract airDrop is Ownable{

    
    IERC20 public token;

    bytes32 public merkleRoot;
    address public Bayc_Holder = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;
    

    mapping(address => bool) public Claims;

    //event AirdropClaimed(address indexed claimant, uint256 amount);

    
    constructor(address _token, bytes32 _merkleRoot) Ownable(msg.sender){
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
    }
    

    function ClaimAirdrop(bytes32[] memory proof, uint256 amount) public {
        require(msg.sender != address(0), "Zero Address");
        require(!Claims[msg.sender], "Claims Already");
         require(IERC721(Bayc_Holder).balanceOf(msg.sender) > 0, "Account Must Hold BayNFT");
    
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, amount))));
    
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
    
        Claims[msg.sender] = true;
    
        IERC20(token).transfer(msg.sender, amount);
        //emit AirdropClaimed(msg.sender, amount);
    }

      function withdrawRemainingTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Fail to Transfer Token");
    }

}