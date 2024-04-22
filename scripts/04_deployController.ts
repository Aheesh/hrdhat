//read the ControllerCreated event

//fetch poolId

//deploy controller
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const vaultAddressMainnet = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";
const poolId =
  "0xb1541a6aca5632f218d4ae2270435f3bb10f06d80001000000000000000000d2";
//const managedPoolAddressMainnet = "0xBF904F9F340745B4f0c4702c7B6Ab1e808eA6b93";
//const managedPoolAddressSepolia = "0x63e179C5b6d54B2c2e36b9cE4085EF5A8C86D50c";

const funcController: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Controller", {
    from: deployer,
    args: [vaultAddressMainnet, poolId],
    log: true,
  });
};

export default funcController;
funcController.tags = ["Controller"];
