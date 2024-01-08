import { networks } from "../networks";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import {
  StakeAcrossSender,
  StakeAcrossSender__factory,
  StakeAcrossVaultProtocol,
} from "../typechain-types";

// usage example:
// npx hardhat transfer-token \
// --network fuji \
// --sender 0x2f5dA50367C19B3e7d01f28109978B9A1a9708AF \
// --protocol 0xbe38384a67Cd54360E887468Aa109c2827486A29 \
// --dest-chain sepolia \
// --amount 100

task(
  "transfer-token",
  "transfers token x-chain from Sender.sol to Protocol.sol"
)
  .addParam("sender", "address of Sender.sol")
  .addParam("protocol", "address of Protocol.sol")
  .addParam("destChain", "destination chain as specified in networks.js file")
  .addParam(
    "amount",
    "token amount to transfer in expressed in smallest denomination (eg juels, wei)"
  )
  .setAction(async (taskArguments, hre) => {
    // get network name from params
    const networkName = hre.network.name as keyof typeof networks;

    if (networkName !== "fuji") {
      throw Error("This task is intended to be executed on the Fuji network.");
    }

    let bnmTokenAddress = networks[networkName].bnmToken;
    if (!bnmTokenAddress) {
      throw Error("Missing BnM Token Address from networks.js file");
    }

    const { sender, protocol, amount } = taskArguments;
    const destChain = taskArguments.destChain as keyof typeof networks;
    let destChainSelector = networks[destChain].chainSelector;

    const senderFactory: StakeAcrossSender__factory = <
      StakeAcrossSender__factory
    >await hre.ethers.getContractFactory("StakeAcrossSender");

    const senderContract: StakeAcrossSender = <StakeAcrossSender>(
      senderFactory.attach(sender)
    );

    try {
      const sendTokensTx = await senderContract.sendMessage(
        destChainSelector,
        protocol,
        bnmTokenAddress,
        amount,
        1000000,
        {
          gasLimit: 1000000,
        }
      );

      await sendTokensTx.wait(2);

      console.log("\nTx hash is ", sendTokensTx.hash);
      console.log(`\nPlease visit the CCIP Explorer at 'https://ccip.chain.link' 
      and paste in the Tx Hash '${sendTokensTx.hash}' to view the status of your CCIP tx.
    Be sure to make a note of your Message Id for use in the next steps.`);
    } catch (error) {
      console.log(error);
    }
  });
