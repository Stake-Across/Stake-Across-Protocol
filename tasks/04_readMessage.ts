import { networks } from "../networks";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import {
  StakeAcrossSender,
  StakeAcrossSender__factory,
  StakeAcrossVaultProtocol__factory,
  StakeAcrossVaultProtocol,
} from "../typechain-types";

// usage example:
// npx hardhat read-message \
// --network fuji \
// --address 0x224551537eD9fE2D92a0C34004faE603209aA526  \
// --contract Sender \
// --message-id 0x73785426db8a382cac311612a33c5125b45294f737b080432d92eec8cad8d108

task("read-message", "reads CCIP message on dest contract")
  .addParam("address", "address of CCIP contract to read")
  .addParam("contract", "Name of the CCIP contract to read")
  .addParam("messageId", "messageId to retrieve from the contract")
  .setAction(async (taskArgs, hre) => {
    // get network name from params
    const networkName = hre.network.name as keyof typeof networks;

    if (networkName != "fuji" && networkName != "sepolia") {
      throw Error(
        "This command is intended to be used with either Fuji or Sepolia."
      );
    }

    let { address, contract, messageId } = taskArgs;

    let ccipContract: StakeAcrossVaultProtocol | StakeAcrossSender;

    if (contract === "Protocol") {
      const ccipContractFactory: StakeAcrossVaultProtocol__factory = <
        StakeAcrossVaultProtocol__factory
      >await hre.ethers.getContractFactory("StakeAcrossVaultProtocol");

      ccipContract = <StakeAcrossVaultProtocol>(
        ccipContractFactory.attach(address)
      );
    } else if (contract === "Sender") {
      const ccipContractFactory: StakeAcrossSender__factory = <
        StakeAcrossSender__factory
      >await hre.ethers.getContractFactory("StakeAcrossSender");

      ccipContract = <StakeAcrossSender>ccipContractFactory.attach(address);
    } else {
      throw Error(
        `Contract ${contract} not valid. Must be "Protocol" or "Sender"`
      );
    }

    const [
      sourceChainSelector,
      senderContract,
      depositorEOA,
      transferredToken,
      amountTransferred,
    ] = await ccipContract.messageDetail(messageId);

    console.log(`\nmessage details received in ${contract} on ${networkName}: 
    messageId: ${messageId},
    sourceChainSelector: ${sourceChainSelector},
    senderContract: ${senderContract},
    depositorEOA: ${depositorEOA},
    transferredToken: ${transferredToken},
    amountTransferred: ${amountTransferred}
    `);

    // Checking state on Protocol.sol
    if (contract === "Protocol") {
      // ts-ignore accesor to a public property
      // tslint:disable-next-line: no-string-literal
      const deposit = await ccipContract.deposits(
        depositorEOA,
        transferredToken
      );
      
      // const borrowedToken = await ccipContract.usdcToken()
      // const borrowings = await ccipContract.borrowings(depositorEOA, borrowedToken)
      console.log(`Deposit recorded on Protocol: 
        Depositor: ${depositorEOA}, 
        Token: ${transferredToken}, 
        Deposited Amount: ${deposit}
        `);
      // read vault properties
      const vaultTotalAssets = await (
        ccipContract as StakeAcrossVaultProtocol
      ).totalAssets();
      const vaultTotalSupply = await (
        ccipContract as StakeAcrossVaultProtocol
      ).totalSupply();
      console.log(
        `\nVault Total Assets: ${hre.ethers.formatEther(
          vaultTotalAssets.toString()
        )}`
      );
      console.log(
        `\nVault Total Supply: ${hre.ethers.formatEther(
          vaultTotalSupply.toString()
        )}`
      );
    }
  });
