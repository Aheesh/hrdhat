//Deploy ControllerFactory contract

import { ContractTransactionReceipt } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ControllerFactory } from "../typechain-types/contracts/ControllerFactory";
import { ethers } from "hardhat";

const vaultAddress = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
const managedPoolAddressMainnet = "0xBF904F9F340745B4f0c4702c7B6Ab1e808eA6b93";
//const managedPoolAddressSepolia = "0x63e179C5b6d54B2c2e36b9cE4085EF5A8C86D50c";
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
  //check if controller contract was deployed successfully

  ////////////////////////////Controller Pool Deployment////////////////////////

  const minimalParams: ControllerFactory.MinimalPoolParamsStruct = {
    name: "GameToken",
    symbol: "GT",
    tokens: [deploymentA.address, deploymentB.address],
    normalizedWeights: ["500000000000000000", "500000000000000000"],
    swapFeePercentage: "10000000000000000",
    swapEnabledOnStart: true,
    managementAumFeePercentage: "10000000000000000",
    aumFeeId: 0,
  };
  /* call the instance on ContractFactory.create() function to create a new instance of the contract
  using the PlayerAToken and PlayerBToken addresses and 50:50 weight. Check for 
  ControllerCreated event  and get the poolId from the event args */
  const ContollerFactoryContract = await ethers.getContractAt(
    "ControllerFactory",
    deployment.address
  );
  console.log(
    "*******ControllerFactory *******",
    await ContollerFactoryContract.isDisabled()
  );
  // const receipt = (await (
  //   await ContollerFactoryContract.create(minimalParams)
  // ).wait()) as unknown as ContractTransactionReceipt;

  // console.log("receipt", receipt);
  //////////////////////////////////////////////////////////////////////////////
};

export default func;
func.tags = ["ControllerFactory"];
