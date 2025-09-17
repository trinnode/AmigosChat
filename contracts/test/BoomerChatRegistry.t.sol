// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.24;

// import {Test, console} from "forge-std/Test.sol";
// import {AmigoChatRegistry} from "../src/AmigoChatRegistry.sol";

// contract AmigoChatRegistryTest is Test {
//     AmigoChatRegistry public AmigoChat;

//     address public owner = makeAddr("owner");
//     address public user1 = makeAddr("user1");
//     address public user2 = makeAddr("user2");
//     address public user3 = makeAddr("user3");

//     uint256 public constant REGISTRATION_FEE = 0.0001 ether;

//     string public constant VALID_NAME1 = "alice_123";
//     string public constant VALID_NAME2 = "bob_456";
//     string public constant IPFS_HASH1 =
//         "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
//     string public constant IPFS_HASH2 =
//         "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A";

//     event AmigoUserRegistered(
//         address indexed user,
//         string AmigoName,
//         string ipfsImageHash,
//         uint256 timestamp
//     );

//     event GroupMessageSent(
//         address indexed sender,
//         string message,
//         uint256 timestamp,
//         uint256 messageId
//     );

//     event DirectMessageSent(
//         address indexed sender,
//         address indexed recipient,
//         string message,
//         uint256 timestamp,
//         uint256 messageId
//     );

//     function setUp() public {
//         vm.startPrank(owner);
//         AmigoChat = new AmigoChatRegistry(REGISTRATION_FEE);
//         vm.stopPrank();

//         // Give users some ETH
//         vm.deal(user1, 1 ether);
//         vm.deal(user2, 1 ether);
//         vm.deal(user3, 1 ether);
//     }

//     // Registration Tests
//     function test_RegisterAmigoUser() public {
//         vm.startPrank(user1);

//         vm.expectEmit(true, false, false, true);
//         emit AmigoUserRegistered(
//             user1,
//             VALID_NAME1,
//             IPFS_HASH1,
//             block.timestamp
//         );

//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         assertTrue(AmigoChat.isRegisteredAmigoUser(user1));
//         assertEq(AmigoChat.getAmigoUserByName(VALID_NAME1), user1);

//         (
//             string memory name,
//             string memory imageHash,
//             uint256 regTime,
//             bool isOnline
//         ) = AmigoChat.getAmigoProfile(user1);

//         assertEq(name, VALID_NAME1);
//         assertEq(imageHash, IPFS_HASH1);
//         assertTrue(isOnline);
//         assertEq(regTime, block.timestamp);

//         vm.stopPrank();
//     }

//     function test_RevertInsufficientFee() public {
//         vm.startPrank(user1);

//         vm.expectRevert("Insufficient registration fee");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE - 1}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         vm.stopPrank();
//     }

//     function test_RevertDuplicateRegistration() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         vm.expectRevert("User already registered");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME2,
//             IPFS_HASH2
//         );

//         vm.stopPrank();
//     }

//     function test_RevertDuplicateName() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         vm.stopPrank();

//         vm.startPrank(user2);
//         vm.expectRevert("Amigo name already taken");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH2
//         );
//         vm.stopPrank();
//     }

//     function test_RevertInvalidNameTooShort() public {
//         vm.startPrank(user1);

//         vm.expectRevert("Name must be 3-20 characters");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}("ab", IPFS_HASH1);

//         vm.stopPrank();
//     }

//     function test_RevertInvalidNameTooLong() public {
//         vm.startPrank(user1);

//         vm.expectRevert("Name must be 3-20 characters");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             "this_name_is_way_too_long_for_Amigo",
//             IPFS_HASH1
//         );

//         vm.stopPrank();
//     }

//     function test_RevertInvalidNameFormat() public {
//         vm.startPrank(user1);

//         vm.expectRevert("Invalid .Amigo name format");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             "Alice-123",
//             IPFS_HASH1
//         ); // dash not allowed

//         vm.stopPrank();
//     }

//     function test_RevertEmptyImageHash() public {
//         vm.startPrank(user1);

//         vm.expectRevert("IPFS image hash required");
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(VALID_NAME1, "");

//         vm.stopPrank();
//     }

//     // Group Message Tests
//     function test_SendGroupMessage() public {
//         // Register user first
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         string memory message = "Hello AmigoChat!";

//         vm.expectEmit(true, false, false, true);
//         emit GroupMessageSent(user1, message, block.timestamp, 0);

//         AmigoChat.sendGroupMessage(message);

//         (
//             address[] memory senders,
//             string[] memory messages,
//             uint256[] memory timestamps,
//             uint256[] memory ids
//         ) = AmigoChat.getGroupMessages(0, 10);

//         assertEq(senders.length, 1);
//         assertEq(senders[0], user1);
//         assertEq(messages[0], message);
//         assertEq(timestamps[0], block.timestamp);
//         assertEq(ids[0], 0);

//         vm.stopPrank();
//     }

//     function test_RevertGroupMessageNotRegistered() public {
//         vm.startPrank(user1);

//         vm.expectRevert("Must be registered .Amigo user");
//         AmigoChat.sendGroupMessage("Hello!");

//         vm.stopPrank();
//     }

//     function test_RevertEmptyGroupMessage() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         vm.expectRevert("Message cannot be empty");
//         AmigoChat.sendGroupMessage("");

//         vm.stopPrank();
//     }

//     function test_RevertGroupMessageTooLong() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         // Create a message with 300 characters (definitely longer than 280 limit)
//         string
//             memory longMessage = "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";

//         vm.expectRevert("Message too long");
//         AmigoChat.sendGroupMessage(longMessage);

//         vm.stopPrank();
//     }

//     // Direct Message Tests
//     function test_SendDirectMessage() public {
//         // Register both users
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         vm.stopPrank();

//         vm.startPrank(user2);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME2,
//             IPFS_HASH2
//         );
//         vm.stopPrank();

//         // Send DM from user1 to user2
//         vm.startPrank(user1);
//         string memory message = "Hey Bob!";

//         vm.expectEmit(true, true, false, true);
//         emit DirectMessageSent(user1, user2, message, block.timestamp, 0);

//         AmigoChat.sendDirectMessage(user2, message);

//         (
//             address[] memory senders,
//             string[] memory messages,
//             uint256[] memory timestamps,
//             uint256[] memory ids
//         ) = AmigoChat.getDirectMessages(user2, 0, 10);

//         assertEq(senders.length, 1);
//         assertEq(senders[0], user1);
//         assertEq(messages[0], message);
//         assertEq(timestamps[0], block.timestamp);
//         assertEq(ids[0], 0);

//         vm.stopPrank();
//     }

//     function test_RevertDirectMessageToUnregistered() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         vm.expectRevert("Recipient must be registered");
//         AmigoChat.sendDirectMessage(user2, "Hello!");

//         vm.stopPrank();
//     }

//     function test_RevertDirectMessageToSelf() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         vm.expectRevert("Cannot send message to yourself");
//         AmigoChat.sendDirectMessage(user1, "Hello myself!");

//         vm.stopPrank();
//     }

//     // Profile Tests
//     function test_UpdateProfileImage() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         string memory newHash = "QmNewHashForUpdatedImage123456789";
//         AmigoChat.updateProfileImage(newHash);

//         (, string memory imageHash, , ) = AmigoChat.getAmigoProfile(user1);
//         assertEq(imageHash, newHash);

//         vm.stopPrank();
//     }

//     function test_UpdateOnlineStatus() public {
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );

//         AmigoChat.updateOnlineStatus(false);

//         (, , , bool isOnline) = AmigoChat.getAmigoProfile(user1);
//         assertFalse(isOnline);

//         vm.stopPrank();
//     }

//     // View Function Tests
//     function test_GetAllRegisteredUsers() public {
//         // Register multiple users
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         vm.stopPrank();

//         vm.startPrank(user2);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME2,
//             IPFS_HASH2
//         );
//         vm.stopPrank();

//         (
//             address[] memory users,
//             string[] memory names,
//             string[] memory hashes,
//             bool[] memory statuses
//         ) = AmigoChat.getAllRegisteredUsers();

//         assertEq(users.length, 2);
//         assertEq(users[0], user1);
//         assertEq(users[1], user2);
//         assertEq(names[0], VALID_NAME1);
//         assertEq(names[1], VALID_NAME2);
//         assertEq(hashes[0], IPFS_HASH1);
//         assertEq(hashes[1], IPFS_HASH2);
//         assertTrue(statuses[0]);
//         assertTrue(statuses[1]);
//     }

//     function test_IsAmigoNameAvailable() public {
//         assertTrue(AmigoChatRegistry.isAmigoNameAvailable(VALID_NAME1));

//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         vm.stopPrank();

//         assertFalse(AmigoChat.isAmigoNameAvailable(VALID_NAME1));
//         assertTrue(AmigoChat.isAmigoNameAvailable(VALID_NAME2));
//     }

//     function test_GetMessageCounts() public {
//         assertEq(AmigoChat.getGroupMessageCount(), 0);
//         assertEq(AmigoChat.getDirectMessageCount(), 0);

//         // Register users and send messages
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         AmigoChat.sendGroupMessage("Hello group!");
//         vm.stopPrank();

//         vm.startPrank(user2);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME2,
//             IPFS_HASH2
//         );
//         AmigoChat.sendDirectMessage(user1, "Hello Alice!");
//         vm.stopPrank();

//         assertEq(AmigoChat.getGroupMessageCount(), 1);
//         assertEq(AmigoChat.getDirectMessageCount(), 1);
//     }

//     // Admin Tests
//     function test_SetRegistrationFee() public {
//         uint256 newFee = 0.002 ether;

//         vm.startPrank(owner);
//         AmigoChat.setRegistrationFee(newFee);
//         vm.stopPrank();

//         assertEq(AmigoChat.registrationFee(), newFee);
//     }

//     function test_RevertSetRegistrationFeeNotOwner() public {
//         vm.startPrank(user1);

//         vm.expectRevert();
//         AmigoChat.setRegistrationFee(0.002 ether);

//         vm.stopPrank();
//     }

//     function test_WithdrawFees() public {
//         // Register a user to generate fees
//         vm.startPrank(user1);
//         AmigoChat.registerAmigoUser{value: REGISTRATION_FEE}(
//             VALID_NAME1,
//             IPFS_HASH1
//         );
//         vm.stopPrank();

//         uint256 ownerBalanceBefore = owner.balance;

//         vm.startPrank(owner);
//         AmigoChat.withdrawFees();
//         vm.stopPrank();

//         assertEq(owner.balance, ownerBalanceBefore + REGISTRATION_FEE);
//         assertEq(address(AmigoChat).balance, 0);
//     }

//     function test_RevertWithdrawFeesNotOwner() public {
//         vm.startPrank(user1);

//         vm.expectRevert();
//         AmigoChat.withdrawFees();

//         vm.stopPrank();
//     }

//     function test_RevertWithdrawFeesNoBalance() public {
//         vm.startPrank(owner);

//         vm.expectRevert("No fees to withdraw");
//         AmigoChat.withdrawFees();

//         vm.stopPrank();
//     }
// }
