import { networks } from "../networks";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import {
  StakeAcrossSender,
  StakeAcrossSender__factory,
  StakeAcrossVaultProtocol,
  StakeAcrossVaultProtocol__factory
} from "../typechain-types";

// usage example:
// npx hardhat read-protocol \
// --network sepolia \
// --address 0x6A10e6519a209482C8456C56768E7eA2fF0E19a1

task("read-protocol", "reads protocol contract balances")
  .addParam("address", "address of CCIP contract to read")
  .setAction(async (taskArgs, hre) => {
    // get network name from params
    const networkName = hre.network.name as keyof typeof networks;

    if (networkName != "fuji" && networkName != "sepolia") {
      throw Error(
        "This command is intended to be used with either Fuji or Sepolia."
      );
    }

    let { address } = taskArgs as { address: string };

    const protocolFactory: StakeAcrossVaultProtocol__factory = <
      StakeAcrossVaultProtocol__factory
    >await hre.ethers.getContractFactory("StakeAcrossVaultProtocol");

    const protocolContract = <StakeAcrossVaultProtocol>(
      protocolFactory.attach(address)
    );

    // read vault balances
    const vaultTotalAssets = await protocolContract.totalAssets();
    const vaultTotalSupply = await protocolContract.totalSupply();
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

    // read user balances
    const [deployer] = await hre.ethers.getSigners();
    const userBalance = await protocolContract.balanceOf(deployer.address);
    const symbol = await protocolContract.symbol();
    console.log(
      `\nUser ${symbol} Balance: ${hre.ethers.formatEther(
        userBalance.toString()
      )}`
    );

    // read vault preview redeem for user balance
    const assetsRedeem = await protocolContract.previewRedeem(userBalance);
    console.log(
      `\nVault Preview Redeem: ${hre.ethers.formatEther(
        assetsRedeem.toString()
      )}`
    );
  });
