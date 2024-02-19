const domainSettings = {
  chainId: process.env.networkId,
  name: "Name",
  verifyingContract: "0x",
  version: "1",
};

const primaryType = "DocList";

const EIP712DomainStruct = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const DocListStruct = [
  { name: "fingerPrint", type: "string" },
];


module.exports = {
  domainSettings,
  primaryType,
  EIP712DomainStruct,
  DocListStruct,
  // ByteStruct,
};