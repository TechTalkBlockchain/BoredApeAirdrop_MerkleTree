---

# Bored Ape Airdrop with Merkle Tree

This project demonstrates how to create a Merkle tree-based airdrop where only Bored Ape Yacht Club (BAYC) NFT holders can claim ERC20 tokens. It includes scripts to generate a Merkle tree from eligible addresses and a smart contract that validates claims through Merkle proofs.

## Features
- Airdrop restricted to BAYC NFT holders.
- Merkle tree for efficient and secure claims.
- Hardhat setup for local testing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TechTalkBlockchain/BoredApeAirdrop_MerkleTree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. **Generate Merkle Tree**:
   Run the script to generate the Merkle tree and CSV of eligible addresses:
   ```bash
   node scripts/generateMerkleTree.js
   ```

2. **Deploy the Airdrop Contract**:
   Use Hardhat to deploy the contract on a testnet or local network:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

3. **Claiming Tokens**:
   Users can claim their airdrop using the Merkle proof generated in the CSV file.

## Testing

Run the tests with Hardhat:
```bash
npx hardhat test
```

## License
This project is licensed under the MIT License.

--- 
