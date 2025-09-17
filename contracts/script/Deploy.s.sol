// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {AmigoChatRegistry} from "../src/AmigoChatRegistry.sol";

contract DeployScript is Script {
    function run() external {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast();

        // Deploy with initial registration fee (0.0001 ETH)
        AmigoChatRegistry amigoChat = new AmigoChatRegistry(0.0001 ether);

        console.log("AmigoChatRegistry deployed to:", address(amigoChat));
        console.log("Registration fee:", amigoChat.registrationFee());
        console.log("Owner:", amigoChat.owner());

        vm.stopBroadcast();
    }
}
