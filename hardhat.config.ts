import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.1" }, { version: "0.7.1" }],
  },
  paths: {
    sources: "./contracts",
  },
};

export default config;
