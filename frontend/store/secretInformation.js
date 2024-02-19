

const avalanche_sender_address =   process.env['AVALANCHE_SENDER_ADDRESS'];
const stakeAccrossReceiverContractAddress =  process.env['ETHEREUM_RECEIVER_ADDRESS'];
const linkTokenAddress = process.env['LINK_TOKEN_ADDRESS'];
const ccipTokenAddress = process.env['CCIP_TOKEN_ADDRESS'];
const infuraPrivateKey = process.env['INFURA_PRIVATE_KEY'];
const GAS_LIMIT=600000;
module.exports={
    avalanche_sender_address,
    stakeAccrossReceiverContractAddress,
    linkTokenAddress,
    ccipTokenAddress,
    infuraPrivateKey,
    GAS_LIMIT
}

