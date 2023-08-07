// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNumAttack {
    constructor() {
        assembly {
            // Store 0x2a or 42 at memory position 0
            // PUSH1 2a -> 60 2a
            // PUSH1 0 -> 60 00
            // MSTORE -> 52

            // Return 0x20 or 32 bytes from memory
            // PUSH1 20 -> 60 20
            // PUSH1 0 -> 60 00
            // RETURN -> f3

            // Bytecode: 0x602a60005260206000f3 (length 0x0a or 10)
            // Bytecode within a 32 byte word:
            // 0x00000000000000000000000000000000000000000000604260005260206000f3 (length 0x20 or 32)
            //                                               ^ (offset 0x16 or 22)
            mstore(0, 0x602a60005260206000f3)

            // Offset 0x16 or 22, size 0x0a or 10
            return(0x16, 0x0a)
        }
    }
}
