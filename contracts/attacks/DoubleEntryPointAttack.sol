// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function raiseAlert(address user) external;
}

contract DoubleEntryPointAttack is IDetectionBot {
    IForta public forta;
    address public cryptoVaultAddress;

    constructor(address _fortaAddress, address _cryptoVaultAddress) {
        forta = IForta(_fortaAddress);
        cryptoVaultAddress = _cryptoVaultAddress;
    }

    function handleTransaction(address user, bytes calldata msgData) external override {
        // msgData:
        // "delegateTransfer(address,uint256,address)"
        //   4 Bytes                            32 Bytes                                                          32 Bytes                                                         32 Bytes
        //                                        to                                                  100000000000000000000 (100 ether)                                           origSender
        // 0x9cd1a121 0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4 0000000000000000000000000000000000000000000000056bc75e2d63100000 000000000000000000000000cd6a42782d230d7c13a74ddec5dd140e55499df9
        // We need to offset 80 (4 + 32 + 32 + 12) bytes to get to the address in the last param
        address origSender = address(bytes20(msgData[80:]));
        if (origSender == cryptoVaultAddress) {
            forta.raiseAlert(user);
        }
    }
}
