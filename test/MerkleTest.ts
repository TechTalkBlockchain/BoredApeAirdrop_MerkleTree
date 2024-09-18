import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { expect } from "chai";
import { ethers } from "hardhat";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

describe("airDrop", function () {
  async function deployFixture() {
    
    const [owner] = await ethers.getSigners();

    const ApeToken = await ethers.getContractFactory("ApeToken");
    const token = await ApeToken.deploy();

  
  const address1 = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; 
  const address2 = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"; 
  const address3 = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"; 
  const address4 ="0xF395767ae0e947504651a33aC2899520c551955D";

    const elements = [
      [address1, ethers.parseEther("20")],
      [address2, ethers.parseEther("10")],
      [address3, ethers.parseEther("10")],
    ];

    const merkleTree = StandardMerkleTree.of(elements, ["address", "uint256"]);
    const root = merkleTree.root;
  

    const airDrop = await ethers.getContractFactory("airDrop");
    const airdrop = await airDrop.deploy(token, root);

    await token.transfer(await airdrop.getAddress(), ethers.parseEther("100"));

    return { token, airdrop, owner, address1, address2, address3, merkleTree};
  }

  it("Should deploy the contract with correct ERC20 token and Merkle root", async function () {
    const { token, airdrop, merkleTree} = await loadFixture(deployFixture);

    expect(await airdrop.token()).to.equal(await token.getAddress());
    expect(await airdrop.merkleRoot()).to.equal(merkleTree.root);
  });

  it("Should allow valid claims", async function () {
    const { owner, airdrop, address1, merkleTree } = await loadFixture(deployFixture);

    await helpers.impersonateAccount(address1);
    const impersonatedSigner = await ethers.getSigner(address1);

    await owner.sendTransaction({
      to: impersonatedSigner,
      value: ethers.parseEther("1.0")
    });

    const leaf = [address1, ethers.parseEther("100")];
    const proof = merkleTree.getProof(leaf);
  
  });
  
});
