const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiled = require("./compile");
const interface = compiled.abi;
const bytecode = compiled.evm.bytecode.object;

const provider = new HDWalletProvider(
  "track urban song body clarify alarm firm bike guard agent small around",
  "rinkeby.infura.io/v3/76572308a2714058a90cddf49b651930"
);

const web3 = new Web3(provider);
let result;
const deploy = async () => {
  const accounts = await web3.eth.accounts._provider.addresses;

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ["Hi There!"] })
    .send({ from: accounts[0], gas: "1000000", gasPrice: "3000000000" })
    .on("receipt", receipt => {
      console.log(receipt.contractAddress); // contains the new contract address
    })
    .on("error", error => {
      console.log(error);
    });
  //   result.setProvider(provider);
  console.log(await result.methods.message().call());
};
deploy();
