#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    source .env
    echo "✅ Environment variables loaded"
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check if required variables are set
if [ -z "$PRIVATE_KEY" ] || [ -z "$Lisk_RPC_URL" ]; then
    echo "❌ Missing required environment variables!"
    echo "Please ensure PRIVATE_KEY and Lisk_RPC_URL are set in .env"
    exit 1
fi

echo "🚀 Starting deployment to Lisk..."
echo "📡 RPC URL: $Lisk_RPC_URL"

# Deploy without verification first
echo "📦 Deploying contract..."
forge script script/Deploy.s.sol \
    --rpc-url $Lisk_RPC_URL \
    --broadcast \
    --private-key $PRIVATE_KEY

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🔍 To verify later, run:"
    echo "forge verify-contract <CONTRACT_ADDRESS> src/AmigoChatRegistry.sol:AmigoChatRegistry --etherscan-api-key $ETHERSCAN_API_KEY --chain-id 4202"
else
    echo "❌ Deployment failed!"
    exit 1
fi