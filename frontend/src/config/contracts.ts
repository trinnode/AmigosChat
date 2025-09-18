// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  // Lisk Lisk testnet - Active deployment
  4202: "0xE953c7658e3793d8E86A202d5eC039a1832fBdB5", // Deployed AmigoChatRegistry on Lisk Lisk
} as const;

// Get contract address for current network
export const getContractAddress = (chainId: number): string => {
  return (
    CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] ||
    CONTRACT_ADDRESSES[4202]
  );
};

// Default to Lisk Lisk for development
export const CONTRACT_ADDRESS = "0xE953c7658e3793d8E86A202d5eC039a1832fBdB5";

// Contract ABI (Application Binary Interface) - JSON format for better wagmi compatibility
export const Amigo_CHAT_ABI = [
  {
    type: "function",
    name: "registerAmigoUser",
    inputs: [
      { name: "AmigoName", type: "string", internalType: "string" },
      { name: "ipfsImageHash", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "isRegisteredAmigoUser",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmigoProfile",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [
      { name: "AmigoName", type: "string", internalType: "string" },
      { name: "ipfsImageHash", type: "string", internalType: "string" },
      { name: "registrationTime", type: "uint256", internalType: "uint256" },
      { name: "isOnline", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmigoUserByName",
    inputs: [{ name: "AmigoName", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isAmigoNameAvailable",
    inputs: [{ name: "AmigoName", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sendGroupMessage",
    inputs: [{ name: "message", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendDirectMessage",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "message", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getGroupMessages",
    inputs: [
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "senders", type: "address[]", internalType: "address[]" },
      { name: "messages", type: "string[]", internalType: "string[]" },
      { name: "timestamps", type: "uint256[]", internalType: "uint256[]" },
      { name: "messageIds", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDirectMessages",
    inputs: [
      { name: "otherUser", type: "address", internalType: "address" },
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "senders", type: "address[]", internalType: "address[]" },
      { name: "messages", type: "string[]", internalType: "string[]" },
      { name: "timestamps", type: "uint256[]", internalType: "uint256[]" },
      { name: "messageIds", type: "uint256[]", internalType: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateProfileImage",
    inputs: [
      { name: "newIpfsImageHash", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateOnlineStatus",
    inputs: [{ name: "isOnline", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registrationFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGroupMessageCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDirectMessageCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllRegisteredUsers",
    inputs: [],
    outputs: [
      { name: "users", type: "address[]", internalType: "address[]" },
      { name: "AmigoNames", type: "string[]", internalType: "string[]" },
      { name: "imageHashes", type: "string[]", internalType: "string[]" },
      { name: "onlineStatuses", type: "bool[]", internalType: "bool[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AmigoUserRegistered",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "AmigoName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "ipfsImageHash",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GroupMessageSent",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "messageId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DirectMessageSent",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "messageId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProfileImageUpdated",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "oldImageHash",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "newImageHash",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserOnlineStatusChanged",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "isOnline", type: "bool", indexed: false, internalType: "bool" },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const; // Registration fee (0.0001 ETH)
export const REGISTRATION_FEE = "0.0001";
