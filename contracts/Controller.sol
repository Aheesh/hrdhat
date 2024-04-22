// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "@balancer-labs/v2-interfaces/contracts/vault/IVault.sol";
import "@balancer-labs/v2-interfaces/contracts/pool-utils/IManagedPool.sol";
import "@balancer-labs/v2-interfaces/contracts/pool-utils/ILastCreatedPoolFactory.sol";

/**
 * @title Controller
 * @notice This is a Managed Pool Controller that exists to be the owner of Managed Pools.
 */
contract Controller {
    IVault private immutable _vault;
    bytes32 private immutable _poolId;

    constructor(IVault vault, bytes32 poolId) {
        if (poolId == 0x0) {
            poolId = IManagedPool(
                ILastCreatedPoolFactory(msg.sender).getLastCreatedPool()
            ).getPoolId();
        }
        // Verify that this is a real Vault and the pool is registered - this call will revert if not.
        vault.getPool(poolId);

        //Store the vault and poolId
        _vault = vault;
        _poolId = poolId;
    }

    function getPoolId() public view returns (bytes32) {
        return _poolId;
    }

    function getVault() public view returns (IVault) {
        return _vault;
    }

    //function to get the pool tokens from the vault calling the IVault.getPoolTokens function
    function getPoolTokens()
        public
        view
        returns (address[] memory, uint256[] memory, uint256)
    {
        IERC20[] memory tokenContracts;
        uint256[] memory balances;
        uint256 totalBalance;

        (tokenContracts, balances, totalBalance) = _vault.getPoolTokens(
            _poolId
        );

        address[] memory tokens = new address[](tokenContracts.length);
        for (uint i = 0; i < tokenContracts.length; i++) {
            tokens[i] = address(tokenContracts[i]);
        }

        return (tokens, balances, totalBalance);
    }

    //Function to allow EOA to join the pool calling the IVault.joinPool function
    // function joinPool(uint256 amount, uint256[] calldata maxAmountsIn)
    //     external
    // {
    //     _vault.joinPool(_poolId, msg.sender, msg.sender , maxAmountsIn);
    // }
}
