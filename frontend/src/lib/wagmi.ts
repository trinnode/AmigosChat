import { createConfig, http } from "wagmi";
import { liskSepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Environment variables (these will be set via .env file)
const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo-project-id";

export const config = createConfig({
  chains: [liskSepolia],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "AmigoChat",
      appLogoUrl: "/amigo.png",
    }),
    walletConnect({
      projectId,
      metadata: {
        name: "AmigoChat",
        description: "On-chain chat dApp with .Amigo ENS",
        url: "https://amigos-chatv2.vercel.app/",
        icons: ["/amigo.png"],
      },
    }),
  ],
  transports: {
    [liskSepolia.id]: http(
      import.meta.env.VITE_Lisk_RPC_URL || "https://Lisk.infura.io/v3/demo"
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
