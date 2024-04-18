import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import controllerABI from "../artifacts/contracts/ControllerFactory.sol/ControllerFactory.json";

//typescript code for reading past event[0] for ControllerFactory contract deployed on Sepolia

async function readPastEvents() {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );
  const contractAddress = "0x0181c246e92340aC7E23ce9825E3b49022d09Eff";
  const contractABI = controllerABI.abi;

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const filter = contract.filters.ControllerCreated();
  const iface = new ethers.Interface(contractABI);
  const parsedLog = await contract.queryFilter(filter);
  const eventArguments = iface.parseLog(parsedLog[0]);
  console.log("Event Arguments:", eventArguments);
}

readPastEvents();
