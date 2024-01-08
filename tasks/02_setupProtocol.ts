import { networks } from "../networks";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import { StakeAcrossVaultProtocol } from "../typechain-types";

// usage example: npx hardhat setup-protocol --network sepolia

task("setup-protocol", "deploy StakeAcrossVaultProtocol.sol").setAction(
  async (taskArguments, hre) => {
    // get network name from params
    const networkName = hre.network.name;

    if (networkName === "hardhat") {
      throw Error(
        "This command cannot be used on a local development chain.  Specify a valid network."
      );
    }

    if (networkName !== "sepolia") {
      throw Error(
        "This task is intended to be executed on the Sepolia network."
      );
    }

    const bnmToken = networks[networkName].bnmToken;
    if (!bnmToken) {
      throw Error("Missing BNM Token target");
    }

    const ROUTER = networks[networkName].router;
    const LINK = networks[networkName].linkToken;
    const LINK_AMOUNT = "1";
    const ETH_AMOUNT = "0.5";
    const VAULT_ASSET = bnmToken;
    const VAULT_BASIS_POINTS = "100";

    console.log("\n__Compiling Contracts__");
    await hre.run("compile");

    // Deploy the StakeAcrossVaultProtocol contract
    console.log(
      `\nDeploying StakeAcrossVaultProtocol.sol to ${networkName}...`
    );

    const protocolContract: StakeAcrossVaultProtocol = <
      StakeAcrossVaultProtocol
    >await hre.ethers.deployContract("StakeAcrossVaultProtocol", [
      ROUTER,
      LINK,
      VAULT_ASSET,
      VAULT_BASIS_POINTS,
    ]);

    await protocolContract.waitForDeployment();

    console.log(
      `\nProtocol contract is deployed to ${networkName} at ${protocolContract.target}`
    );

    const [deployer] = await hre.ethers.getSigners();

    // Fund with LINK
    console.log(
      `\nFunding ${protocolContract.target} with ${LINK_AMOUNT} LINK `
    );
    const linkTokenContract = await hre.ethers.getContractAt(
      "LinkTokenInterface",
      networks[networkName].linkToken
    );

    // Transfer LINK tokens to the Protocol contract
    const linkTx = await linkTokenContract.transfer(
      protocolContract.target,
      hre.ethers.parseEther(LINK_AMOUNT)
    );
    await linkTx.wait(1);

    const juelsBalance = await linkTokenContract.balanceOf(
      protocolContract.target
    );
    const linkBalance = hre.ethers.formatEther(juelsBalance.toString());
    console.log(`\nFunded ${protocolContract.target} with ${linkBalance} LINK`);

    // Fund with ETH
    console.log(`\nFunding ${protocolContract.target} with 0.5 ETH `);
    const ethTx = await deployer.sendTransaction({
      to: protocolContract.target,
      value: hre.ethers.parseEther(ETH_AMOUNT),
    });
    await ethTx.wait(1);

    const ethBalance = await hre.ethers.provider.getBalance(
      protocolContract.target
    );
    console.log(
      `\nFunded ${protocolContract.target} with ${hre.ethers.formatEther(
        ethBalance.toString()
      )} ETH`
    );

    // read vault properties
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
  }
);
