/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { toast } from "react-hot-toast";
import { liskSepolia } from "../config/wagmi";

export const useNetworkValidation = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isCorrectNetwork = chainId === (liskSepolia.id as any);
  const isWrongNetwork = isConnected && !isCorrectNetwork;

  const switchToLiskLisk = () => {
    if (!switchChain) {
      toast.error("Network switching not supported by this wallet");
      return;
    }

    switchChain(
      { chainId: liskSepolia.id as any },
      {
        onSuccess: () => {
          toast.success(`Successfully switched to ${liskSepolia.name}`);
        },
        onError: (error) => {
          console.error("Network switch failed:", error);
          toast.error("Failed to switch network. Please try manually.");
        },
      }
    );
  };

  // Show network warning toast when on wrong network
  useEffect(() => {
    if (isWrongNetwork) {
      const getChainName = (id: number) => {
        switch (id) {
          case 4202:
            return "Lisk Lisk";
          default:
            return `Chain ${id}`;
        }
      };

      const currentChainName = getChainName(chainId);

      toast.error(
        `Wrong network detected! Please switch to ${liskSepolia.name}.\nCurrently on: ${currentChainName}`,
        {
          duration: 8000,
          id: "network-warning", // Prevent multiple toasts
        }
      );
    }
  }, [isWrongNetwork, chainId]);

  return {
    isConnected,
    isCorrectNetwork,
    isWrongNetwork,
    currentChainId: chainId,
    supportedChainId: liskSepolia.id,
    supportedChainName: liskSepolia.name,
    switchToLiskLisk,
    isSwitching,
  };
};
