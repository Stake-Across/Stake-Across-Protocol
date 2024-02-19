import Web3 from "web3";
import sender from '../abi/sender.json';
import receiver from '../abi/receiver.json';
import erc20 from '../abi/erc20.json';
import networks from './testnets.json'
import { ethers, JsonRpcProvider } from 'ethers';
import content from '../translate/en.json';
import secretInformation from '../store/secretInformation';

//to move
const data = JSON.parse(JSON.stringify(networks));
const infuraPrivateKey = process.env.INFURA_PRIVATE_KEY ;
const GAS_LIMIT = 600000;
const contractSenderJSONABI = JSON.parse(JSON.stringify(sender));
const contractReceiverJSONABI = JSON.parse(JSON.stringify(receiver));


async function addNetwork(data) {
  const { id, chainName, tokenName, tokenSymbol, decimals, rpcList, explorerList } = data;
  // console.log("METAMASK data", data)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: id }], // Hexadecimal version of 137, prefixed with 0x
    });
  } catch (error) {

    if (error.code === 4902 || error.code === -32002) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: id, // Hexadecimal version of 80001, prefixed with 0x
            chainName: chainName,
            nativeCurrency: {
              name: tokenName,
              symbol: tokenSymbol,
              decimals: decimals,
            },
            rpcUrls: rpcList,
            blockExplorerUrls: explorerList,
            iconUrls: [""],
          }],
        });
      } catch (addError) {
        throw new Error(`Only ${chainName} should work`);
      }
    }
    else {
      window.alert(`Install metamask!`)
      window.location.replace("/error/login")
      return false;
    }
  }
};

export const metamask = {
  availableNetworks: () => {
    const originalList = Object.values(data);
    const networks = originalList.map((objeto) => ({
      name: objeto.name,
      chainName: objeto.chainName,
      img: objeto.img,
      token: objeto.tokenSymbol
    }))
    return networks;
  },
  currentNetworkId: async () => {
    if (!window.ethereum) {
      throw new Error("You need to install and enable metamask first.");
    }
    const web3 = new Web3(window.ethereum);
    const network = await web3.eth.getChainId();
    return network
  },
  validateNetwork: async (networkName) => {
    const web3 = new Web3(window.ethereum);
    let currentNetworkId = await metamask.currentNetworkId();
    if (web3.utils.numberToHex(currentNetworkId) !== data[networkName]['chainId']) {
      const originalList = Object.values(data);
      networkName = originalList.find((n) => n.id === web3.utils.numberToHex(currentNetworkId)).name
    }
    return networkName;
  },
  signin: async (nonce) => {
    try {
      if (window) {
        //debugger;
        //console.log(data)
        await addNetwork(data);
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        const nonceDef = web3.utils.fromUtf8(`${nonce}`);
        const signature = await web3.eth.personal.sign(nonceDef, address);
        const recover = web3.eth.accounts.recover(nonceDef, signature);
        console.log(recover)
        return signature;
      }
    } catch {
      return console.log("Something went wrong");
    }
  },
  getBalance: async (networkName, accountAddress = '') => {
    if (accountAddress === '') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      accountAddress = await signer.getAddress();
    }
    let balance = [];
    const web3 = new Web3(window.ethereum);
    let currentNetworkBalance = await web3.eth.getBalance(accountAddress);
    currentNetworkBalance = web3.utils.fromWei(currentNetworkBalance, 'ether');
    balance.push({ networkName: networkName, publicKey: accountAddress, tokenSymbol: data[networkName]['tokenSymbol'], tokenBalance: currentNetworkBalance });
    const infuraProvider = new JsonRpcProvider(`${data[networkName]['rpcHttpUrl']}${infuraPrivateKey}`);
    for (let i = 0; i < data[networkName].feeTokens.length; i++) {
      const currentTokenContract = new ethers.Contract(data[networkName].feeTokens[i].address
        , ['function balanceOf(address) view returns (uint)'], infuraProvider);
      let currentBalance = await currentTokenContract.balanceOf(accountAddress);
      currentBalance = web3.utils.fromWei(currentBalance, 'ether');
      balance.push({ networkName: undefined, publicKey: accountAddress, tokenSymbol: data[networkName].feeTokens[i].symbol, tokenBalance: currentBalance });

    }
    return balance;
  },
  doWalletSwitch: async (networkName) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: data[networkName].id }], // Hexadecimal version of 137, prefixed with 0x
    });
  },

  getAddress: async (networkName) => {
    let firstStep = await addNetwork(data[networkName])
    // console.log("firstStep", firstStep)
    if (firstStep !== false) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const address = accounts[0];
      return address;
    } else { return false }

  }
  ,
  sendTokens: async (address, amount, currentNetwork, receiverNetwork = 'ethereum') => {
    try {
      const web3 = new Web3(window.ethereum);
      let chainSelector = data[receiverNetwork]['chainSelector']
      let protocol_receiverContractAddress = data[receiverNetwork]['receiverContractAddress'];
      let bnmTokenAddressSender = data[currentNetwork]['feeTokens'][1]['address'];
      let realAmount = web3.utils.toWei(amount, 'ether')
      /*console.log('senderNetwork', currentNetwork)
      console.log('receiverNetwork', receiverNetwork)
      console.log('chainSelector', chainSelector)
      console.log('protocol', protocol_receiverContractAddress)
      console.log('bnmTokenAddress', bnmTokenAddressSender)
      console.log('amount', realAmount)*/
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(data[currentNetwork]['senderContractAddress'], contractSenderJSONABI, signer);
      let sendTokensTx = await contract.sendMessage(chainSelector, protocol_receiverContractAddress,
        bnmTokenAddressSender, realAmount, GAS_LIMIT, { gasLimit: GAS_LIMIT, })
      await sendTokensTx.wait(2);
      //console.log( JSON.stringify(sendTokensTx.hash))
      return ({ title: 'Successful transaction !!!', detail: 'Transaction successfully submitted ' + `\n ` + JSON.stringify(sendTokensTx.hash) })
    } catch (error) {
      console.log(JSON.stringify(error))
      return ({ title: 'Failed transaction', detail: 'Error submitting transaction ' });
    }

  },

  doRedeem: async (amount) => {
    let networkName = 'ethereum';
    if (data[networkName]['receiverContractAddress'] !== undefined) {
      try {
        const web3 = new Web3(window.ethereum);
        let realAmount = web3.utils.toWei(parseFloat(amount), 'ether')
        console.log(realAmount)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const c = new ethers.Contract(data['ethereum']['receiverContractAddress'], contractReceiverJSONABI.abi, signer);
        let redeemTx = await c.ccipRedeem(realAmount, data['avalanche']['chainSelector'], signer.address, { gasLimit: GAS_LIMIT, })
        await redeemTx.wait(2);
        console.log(redeemTx)
        return ({ title: 'Successful transaction !!!', detail: 'Transaction successfully submitted ' + `\n ` + JSON.stringify(redeemTx.hash) })
      } catch (error) {
        console.log(error)
        return ({ title: 'Failed transaction', detail: 'Error submitting transaction ' });

      }
    }
  },
  previewRedeem: async () => {
    let networkName = 'ethereum';
    if (data[networkName]['receiverContractAddress'] !== undefined) {
      try {
        const web3 = new Web3(window.ethereum);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const c = new ethers.Contract(data['ethereum']['receiverContractAddress'], contractReceiverJSONABI.abi, signer);
        let balance = await c.balanceOf(signer);
        let shares = await c.previewRedeem(balance);
        return [{
          'token': 'AVAX', 'network': 'ethereum', 'apr': '10%',
          'amount': web3.utils.fromWei(balance, 'ether'), 'shares': web3.utils.fromWei(shares, 'ether'),
          'reward': web3.utils.fromWei(shares - balance, 'ether')
        }]
      } catch (error) {
        console.log(JSON.stringify(error))

      }
    }
  },
  getContractInfo: async (networkName) => {
    if (data[networkName]['senderContractAddress'] !== undefined) {
      try {
        const web3 = new Web3(window.ethereum);
        const c = new web3.eth.Contract(contractSenderJSONABI, data[networkName]['senderContractAddress']);
        return await c.methods.owner().call();
      } catch (error) {
        console.log(JSON.stringify(error))
      }   
    }
    return "not available";
  }


};
