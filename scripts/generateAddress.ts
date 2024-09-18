import fs from 'fs';

const addresses = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", 
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", 
  "0xF395767ae0e947504651a33aC2899520c551955D", 
  "0xf76246B0842c92aD5bD745973Ca9EB85B937b126", 
  "0x1fEE3385B22d69E93209dB2042BE58fcaC57B59b"
];

function generateRandomAmount(): number {
  return Math.floor(Math.random() * 91) + 10;
}

const data: string[] = ['address,amount'];
addresses.forEach(address => {
  const amount = generateRandomAmount();
  data.push(`${address},${amount}`);
});

fs.writeFileSync('airdrop.csv', data.join());

console.log('Airdrop data has been generated in airdrop.csv');
