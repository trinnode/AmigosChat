#!/bin/bash

# Deploy to Lisk Lisk
echo "🚀 Deploying AmigoChatRegistry to Lisk Lisk..."

# Load environment variables
source .env

# Deploy the contract
forge script script/Deploy.s.sol \
    --rpc-url $LISK_Lisk_RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --verify \
    --chain-id 4202 \
    -vvvv

echo "✅ Deployment to Lisk Lisk completed!"
echo "📝 Check the broadcast folder for deployment details"