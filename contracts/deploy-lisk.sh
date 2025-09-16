#!/bin/bash

# Deploy to Lisk Sepolia
echo "🚀 Deploying BoomerChatRegistry to Lisk Sepolia..."

# Load environment variables
source .env

# Deploy the contract
forge script script/Deploy.s.sol \
    --rpc-url $LISK_SEPOLIA_RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --verify \
    --chain-id 4202 \
    -vvvv

echo "✅ Deployment to Lisk Sepolia completed!"
echo "📝 Check the broadcast folder for deployment details"