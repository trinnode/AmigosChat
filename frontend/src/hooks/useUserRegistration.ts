import { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useUserStore } from "../stores/userStore";
import { Amigo_CHAT_ABI, CONTRACT_ADDRESS } from "../config/contracts";

export const useUserRegistration = () => {
  const { address, isConnected } = useAccount();
  const { user, setUser, clearUser } = useUserStore();

  // Check if user is registered
  const { data: isRegistered, isLoading: isCheckingRegistration } =
    useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: Amigo_CHAT_ABI,
      functionName: "isRegisteredAmigoUser",
      args: [address!],
      query: {
        enabled: !!address && isConnected,
      },
    });

  // Get user profile data if registered
  const { data: profileData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: Amigo_CHAT_ABI,
    functionName: "getAmigoProfile",
    args: [address!],
    query: {
      enabled: !!address && isConnected && Boolean(isRegistered),
    },
  });

  useEffect(() => {
    if (!isConnected) {
      clearUser();
      return;
    }

    if (isRegistered && profileData) {
      // profileData is a tuple: [AmigoName, ipfsImageHash, registrationTime, isOnline]
      const [AmigoName, ipfsImageHash] = profileData as [
        string,
        string,
        bigint,
        boolean
      ];

      setUser({
        address,
        isRegistered: true,
        username: AmigoName,
        displayName: AmigoName, // AmigoName already includes .Amigo suffix from contract
        bio: "", // Contract doesn't store bio
        profileImageHash: ipfsImageHash,
      });
    } else if (!isCheckingRegistration && isConnected) {
      // User not registered
      setUser({
        address,
        isRegistered: false,
        username: "",
        displayName: "",
        bio: "",
        profileImageHash: "",
      });
    }
  }, [
    isRegistered,
    profileData,
    isConnected,
    address,
    isCheckingRegistration,
    setUser,
    clearUser,
  ]);

  return {
    user,
    isCheckingRegistration,
    isRegistered: user?.isRegistered ?? false,
  };
};
