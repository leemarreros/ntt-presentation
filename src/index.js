import { BigNumber, Contract, providers, ethers, utils } from "ethers";
import miPrimerTokenAbi from "../artifacts/contracts/MiPrimerToken.sol/MiPrimerToken.json";

window.ethers = ethers;

var provider, signer, account;
var miPrimerTokenAddress;

function initSmartContracts() {
  // Mi Primer contrato
  miPrimerTokenAddress = "0xA42F9D634FDb531342203BfC9E65bf9cAaB5731C";

  provider = new providers.Web3Provider(window.ethereum);
  var miPrimerToken = new Contract(
    miPrimerTokenAddress,
    miPrimerTokenAbi.abi,
    provider
  );
}

function setUpListeners() {
  var bttn = document.getElementById("connect");
  bttn.addEventListener("click", async function () {
    if (window.ethereum) {
      [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Billetera metamask", account);

      provider = new providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(account);
      console.log(signer);
      window.signer = signer;
    }
  });

  var bttn = document.getElementById("switch");
  bttn.addEventListener("click", async function () {
    await connectToMumbai();
  });
}

async function setUp() {
  initSmartContracts();
  await setUpListeners();
}

setUp()
  .then()
  .catch((e) => console.log(e));
