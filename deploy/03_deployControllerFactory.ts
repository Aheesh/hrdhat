//Deploy ControllerFactory contract

import { ContractEvent } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const vaultAddress = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
const managedPoolAddressMainnet = "0xBF904F9F340745B4f0c4702c7B6Ab1e808eA6b93";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("ControllerFactory", {
    from: deployer,
    args: [vaultAddress, managedPoolAddressMainnet],
    log: true,
    autoMine: true,
  });

  const deploymentA = await hre.deployments.get("PlayerAToken");
  console.log(
    "deployed contract address 🤾🏻‍♂️ Token A 🤾🏻‍♂️ ===",
    deploymentA.address
  );

  const deploymentB = await hre.deployments.get("PlayerBToken");
  console.log(
    "deployed contract address 🤽🏻‍♀️ Token B 🤽🏻‍♀️===",
    deploymentB.address
  );

  const deployment = await hre.deployments.get("ControllerFactory");
  console.log(
    "deployed contract address 🏭 Controller Factory 🏭 === 🏭",
    deployment.address
  );
};

export default func;
func.tags = ["ControllerFactory"];
