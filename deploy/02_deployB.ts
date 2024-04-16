//deploy the player Token contracts

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { PlayerBToken } from "../typechain-types/contracts/PlayerBToken";

const deployYourContractB: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploy Script 02- Deployer Address: ", deployer);

  // Deploy Player B Token
  await deploy("PlayerBToken", {
    from: deployer,
    args: [3000],
    log: true,
    autoMine: true,
  });

  const deployment = await hre.deployments.get("PlayerBToken");
  console.log("deployed contract address ===", deployment.address);
};

export default deployYourContractB;

deployYourContractB.tags = ["PlayerBToken"];
