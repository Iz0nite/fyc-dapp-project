// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract FreeVoting {
    string private testValue;

    constructor() {
        console.log("Smart Contract deployed");
    }

    function test() public view returns (string memory) {
        return testValue;
    }

    function setTestValue(string memory _testValue) public {
        testValue = _testValue;
    }
}
