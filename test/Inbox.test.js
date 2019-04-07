const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiled = require("../compile");
const interface = compiled.abi;
const bytecode = compiled.evm.bytecode.object;
// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);
// console.log(compiled);
let accounts, inbox;
beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Choose one account
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"]
    })
    .send({
      from: accounts[0],
      gas: 1000000,
      gasPrice: "3000000000"
    });
  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("Deploys the contract", () => {
    assert.ok(true);
  });
  it("sets initial message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi There!"); // instance with the new contract address
  });
  it("can set a new message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    await assert.equal(message, "bye");
  });
});
