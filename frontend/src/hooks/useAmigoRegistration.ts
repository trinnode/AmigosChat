import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { Amigo_CHAT_ABI, REGISTRATION_FEE } from "../config/contracts";
import type { IPFSUploadResponse } from "../utils/ipfs";
import { getIPFSService } from "../utils/ipfs";
import { useUserStore } from "../stores/userStore";
import toast from "react-hot-toast";

export interface RegistrationData {
  username: string;
  displayName: string;
  bio: string;
  profileImage?: File;
}

export interface RegistrationState {
  isUploading: boolean;
  isRegistering: boolean;
  isComplete: boolean;
  error: string | null;
  ipfsData: IPFSUploadResponse | null;
}

export const useAmigoRegistration = () => {
  const [state, setState] = useState<RegistrationState>({
    isUploading: false,
    isRegistering: false,
    isComplete: false,
    error: null,
    ipfsData: null,
  });

  const { setUser } = useUserStore();
  const ipfsService = getIPFSService();

  const {
    writeContract,
    data: hash,
    error: contractError,
    isPending: isContractPending,
  } = useWriteContract();

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const uploadProfileImage = async (
    file: File,
    username: string
  ): Promise<IPFSUploadResponse> => {
    setState((prev) => ({ ...prev, isUploading: true, error: null }));

    try {
      const result = await ipfsService.uploadFile(file, `${username}-profile`);
      setState((prev) => ({ ...prev, ipfsData: result, isUploading: false }));
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload image";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isUploading: false,
      }));
      throw error;
    }
  };

  const registerUser = async (
    data: RegistrationData,
    contractAddress: `0x${string}`
  ) => {
    try {
      setState((prev) => ({ ...prev, isRegistering: true, error: null }));

      let profileImageHash = "";

      // Upload profile image if provided
      if (data.profileImage) {
        toast.loading("Uploading profile image to IPFS...", {
          id: "ipfs-upload",
        });
        const ipfsResult = await uploadProfileImage(
          data.profileImage,
          data.username
        );
        profileImageHash = ipfsResult.ipfsHash;
        toast.success("Image uploaded successfully!", { id: "ipfs-upload" });
      }

      // Register on blockchain
      toast.loading("Registering on blockchain...", {
        id: "blockchain-register",
      });

      // Defensive: trim accidental trailing dots/spaces from contract address
      const safeAddress = (contractAddress as string)
        .trim()
        .replace(/\.+$/g, "");

      // Use configured registration fee so it's consistent across the app
      const value = parseEther(REGISTRATION_FEE);

      // Provide a conservative gas limit fallback. Some RPCs/wallets may fail to estimate gas;
      // passing a gas limit avoids "missing gas limit" errors. Adjust if your contract needs more.
      const gasLimit = 200000n;

      writeContract({
        address: safeAddress as `0x${string}`,
        abi: Amigo_CHAT_ABI,
        functionName: "registerAmigoUser",
        args: [data.username, profileImageHash],
        value,
        gas: gasLimit,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isRegistering: false,
      }));
      toast.error(errorMessage, { id: "blockchain-register" });
    }
  };

  // Handle transaction success
  if (isTransactionSuccess && !state.isComplete) {
    setState((prev) => ({ ...prev, isComplete: true, isRegistering: false }));
    toast.success("Registration complete! Welcome to AmigoChat! 🎉", {
      id: "blockchain-register",
    });

    // Update user store
    setUser({
      isRegistered: true,
      username: "", // Will be fetched from contract
      displayName: "",
      bio: "",
      profileImageHash: state.ipfsData?.ipfsHash || "",
    });
  }

  // Handle transaction error
  if (transactionError && state.isRegistering) {
    const errorMessage = transactionError.message || "Transaction failed";
    setState((prev) => ({
      ...prev,
      error: errorMessage,
      isRegistering: false,
    }));
    toast.error(errorMessage, { id: "blockchain-register" });
  }

  // Handle contract error
  if (contractError && state.isRegistering) {
    const errorMessage = contractError.message || "Contract call failed";
    setState((prev) => ({
      ...prev,
      error: errorMessage,
      isRegistering: false,
    }));
    toast.error(errorMessage, { id: "blockchain-register" });
  }

  const resetState = () => {
    setState({
      isUploading: false,
      isRegistering: false,
      isComplete: false,
      error: null,
      ipfsData: null,
    });
  };

  return {
    ...state,
    isLoading:
      state.isUploading ||
      state.isRegistering ||
      isContractPending ||
      isTransactionLoading,
    registerUser,
    uploadProfileImage,
    resetState,
    transactionHash: hash,
  };
};
