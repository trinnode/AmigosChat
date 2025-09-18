import { http } from "wagmi";
import { defineChain } from "viem";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// Define Lisk chain - our only supported network
export const lisk = defineChain({
  id: 4202,
  name: "Lisk Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Lisk Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.api.lisk.com"] },
    public: { http: ["https://rpc.api.lisk.com"] },
  },
  blockExplorers: {
    default: {
      name: "Lisk  Explorer",
      url: "https://sepolia-blockscout.lisk.com/",
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "AmigoChat dApp",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // You can get a real one from WalletConnect Cloud
  chains: [lisk], // Lisk only
  transports: {
    [lisk.id]: http("https://rpc.api.lisk.com", {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
});

export const SUPPORTED_CHAIN_ID = lisk.id;
export const SUPPORTED_CHAIN = lisk;
