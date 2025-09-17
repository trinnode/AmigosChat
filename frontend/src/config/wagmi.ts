import { http } from "wagmi";
import { defineChain } from "viem";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// Define Lisk Lisk chain - our only supported network
export const liskLisk = defineChain({
  id: 4202,
  name: "Lisk Lisk Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Lisk Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.Lisk-api.lisk.com"] },
    public: { http: ["https://rpc.Lisk-api.lisk.com"] },
  },
  blockExplorers: {
    default: {
      name: "Lisk Lisk Explorer",
      url: "https://Lisk-blockscout.lisk.com",
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "AmigoChat dApp",
  projectId: "demo-project-id", // You can get a real one from WalletConnect Cloud
  chains: [liskLisk], // Lisk Lisk only
  transports: {
    [liskLisk.id]: http("https://rpc.Lisk-api.lisk.com", {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
});

export const SUPPORTED_CHAIN_ID = liskLisk.id;
export const SUPPORTED_CHAIN = liskLisk;
