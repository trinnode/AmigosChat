# AmigoChat dApp

A decentralized chat application with .Amigo domain registration on Ethereum.

## Live Link
[AmigoChat dApp](https://amigos-chat-v2.vercel.app/)

## Features
- **.Amigo Domain Registration**: Claim your unique .Amigo username
- **On-chain Messaging**: All messages stored permanently on blockchain
- **Group & Private Chat**: Public group chat and private direct messaging
- **IPFS Profile Images**: Decentralized profile picture storage
- **Real-time Updates**: Live chat using blockchain events

## 🛠 Tech Stack
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Blockchain**: Ethereum (Lisk Testnet)
- **Smart Contract**: Solidity + Foundry
- **Wallet**: RainbowKit + Wagmi
- **Storage**: IPFS for profile images

## Contract Addresses
- **Lisk Testnet**: [`0xE953c7658e3793d8E86A202d5eC039a1832fBdB5`](https://Lisk.etherscan.io/address/0xE953c7658e3793d8E86A202d5eC039a1832fBdB5)
- **Explorer**: [View on Etherscan](https://sepolia-blockscout.lisk.com/address/0xE953c7658e3793d8E86A202d5eC039a1832fBdB5)

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Contracts
```bash
cd contracts
forge build
forge test
```

## 📝 Usage
1. Connect your wallet (MetaMask recommended)
2. Switch to Lisk testnet
3. Register your .Amigo username
4. Start chatting on-chain!

## 🧪 Testing
- Connect wallet to Lisk testnet
- Get test ETH from [Lisk Faucet](https://sepolia-faucet.lisk.com/)
- Registration fee: 0.0001 ETH
