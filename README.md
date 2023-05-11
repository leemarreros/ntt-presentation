## **Introducción a Hardhat**

#### Hardhat y configuración de pipeline

_Requisito: Tener una versión de NodeJs superior al 14_

Comenzaremos con la creación de un proyecto Hardhat desde cero. Crear una carpeta nueva y continuar con la instalación descrita a continuación:

1. En el terminal, ejecutar `npm init -y` para instalar el `package.json` del repositorio
2. En el terminal, ejecutar `npx hardhat` para comenzar la instalación. Al hacerlo, preguntará lo siguiente:

```
Need to install the following packages:
  hardhat
Ok to proceed? (y)
```

Tipear `y` y luego Enter. Al hacerlo, aparecerá el siguiente mensaje:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.12.0 👷‍

? What do you want to do? …
❯ Create a JavaScript project
  Create a TypeScript project
  Create an empty hardhat.config.js
  Quit
```

Escogemos la opción `Create a JavaScript project` con el teclado y luego presionamos Enter. Para continuar con el set up, darle a todo Enter.

```
✔ What do you want to do? · Create a JavaScript project
✔ Hardhat project root: · /Users/steveleec/Documents/UTEC/solidity-utec-coding
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

Al finalizar la instalación, obtendremos el siguiente mensaje:

```
✨ Project created ✨
```

Con todo esto, tendremos el cascaron de un entorno de desarrollo usando hardhat. Continuemos con la configuración

3. Instalar librería npm dotenv mediante `npm install --save dotenv`. Seguido a ello crearmos un archivo llamado `.env` con el comando `touch .env` ejecutado en el terminal. Replicar el siguiente modelo dentro del archivo `.env`:

```
ADMIN_ACCOUNT_PRIVATE_KEY= es la llave privada obtenida de metamask
GOERLI_TESNET_URL= URL de servicios de Alchemy
MUMBAI_TESNET_URL= URL de servicios de Alchemy
ETHERSCAN_API_KEY= API KEY obtenida de Etherscan
POLYGONSCAN_API_KEY= API KEY obtenida de Polygonscan
```

4. Intalar librería de contratos de Open Zeppelin mediante el command `npm install --save @openzeppelin/contracts`. De esta librer a reutilizaremos código ya testeado y validado.

5. Instalamos la librería Chai para poder extender las funcionalidad de testing de Hardhat `npm install --save-dev chai`. Esto sería una dependencia en `devDependencies`.

6. Instalamos `@nomiclabs/hardhat-etherscan` para poder verificar los contratos mediante scripts desde Hardhat: `npm install --save-dev @nomiclabs/hardhat-etherscan`.

7. Actualizamos el archivo `hardhat.config.js` y debería contener lo siguiente:

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "HTTP://127.0.0.1:8545",
      timeout: 800000,
      gas: "auto",
      gasPrice: "auto",
    },
    goerli: {
      url: process.env.GOERLI_TESNET_URL,
      accounts: [process.env.ADMIN_ACCOUNT_PRIVATE_KEY],
      timeout: 0,
      gas: "auto",
      gasPrice: "auto",
    },
    matic: {
      url: process.env.MUMBAI_TESNET_URL,
      // url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.ADMIN_ACCOUNT_PRIVATE_KEY],
      timeout: 0,
      gas: "auto",
      gasPrice: "auto",
    },
  },
  // etherscan: { apiKey: process.env.ETHERSCAN_API_KEY },
  etherscan: { apiKey: process.env.POLYGONSCAN_API_KEY },
};
```

- `localhost`, `goerli` y `matic` son las redes que hardhat utilizará para poder publicar los contratos inteligentes.
- `url` es uno de los urls usados para poder conectarse a algún nodo privado. En la actualidad existen muchos servicios de conexión. En este caso en particular usaremos `Alchemy`.
- `accounts` es un array que contiene todas las llaves privadas de los address que serán usados para publicar los contratos
- `etherscan` hace referencia a una key obtenida en el explorador de bloques de cada blockchain (usualmente en mainnet) que permite hacer la verificación de smart contracts de manera automática

8. Rellenar las claves del archivo `.env`:

- `ETHERSCAN_API_KEY`: Dirigirte a [Etherscan](http://etherscan.io/). Click en `Sign in`. Click en `Click to sign up` y terminar de crear la cuenta en Etherscan. Luego de crear la cuenta ingresar con tus credenciales. Dirigirte a la columna de la derecha. Buscar `OTHER` > `API Keys`. Crear un nuevo api key haciendo click en `+ Add` ubicado en la esquina superior derecha. Darle nombre al proyecto y click en `Create New API Key`. Copiar el `API Key Token` dentro del archivo `.env`.
- `POLYGONSCAN_API_KEY`: Repetir el anterio paso para [Polygonscan](https://polygonscan.com/)

- `ADMIN_ACCOUNT_PRIVATE_KEY`: Obtener el `private key` de la wallet que se creó en el punto `2` siguiendo [estos pasos](http://help.silamoney.com/en/articles/4254246-how-to-generate-ethereum-keys#:~:text=Retrieving%20your%20Private%20Key%20using,password%20and%20then%20click%20Confirm.) y copiarlo en esta variable en el archivo `.env`.
- `GOERLI_TESNET_URL`: Crear una cuenta en [Alchemy](https://dashboard.alchemyapi.io/). Ingresar al dashboard y crear una app `+ CREATE APP`. Escoger `NAME` y `DESCRIPTION` cualquiera. Escoger `ENVIRONMENT` = `Development`, `CHAIN` = `Ethereum` y `NETWORK` = `Goerli`. Hacer click en `VIEW KEY` y copiar el link `HTTPS` en el documento `.env` para esta variable de entorno. Saltar el paso que te pide incluir tarjeta de débito.
- `POLYGONSCAN_API_KEY`: Repetir el paso anterior en Alchemy para `CHAIN` = `Polygon` y `NETWORK` = `Mumbai`.

![image-20221019052512626](https://user-images.githubusercontent.com/3300958/196975476-4adbfa83-5a47-49c3-b459-98a8bc12bfc9.png)

![image-20221019054403019](https://user-images.githubusercontent.com/3300958/196975461-053de3b8-0f23-4781-b9fc-51ad3f0b4c90.png)

#### Project Setup

Para comenzar un projecto con la configuración inicial, partir de la branch `setUp` mediante el siguiente comando: `npm checkout setUp`. Allí hacer `npm install` desde el terminal. Desde aquí empezaremos a desarrollar smart contracts en Hardhat.

#### Hardhat: Publicando Smart Contracts

1. Crear el archivo `MiPrimerToken.sol` dentro de la carpeta `contracts`. Aquí pegamos el código de nuestro primer token que tomamos del [wizard](https://docs.openzeppelin.com/contracts/4.x/wizard):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MiPrimerToken is ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
```

2. Crear el archivo `deploy.js` dentro de la carpeta `scripts`.

```solidity
const hre = require("hardhat");

async function main() {
  const MiPrimerToken = await hre.ethers.getContractFactory("MiPrimerToken");
  const miPrimerToken = await MiPrimerToken.deploy(
    "Mi Primer Token",
    "MPRMTKN"
  );

  var tx = await miPrimerToken.deployed();
  await tx.deployTransaction.wait(5);

  console.log(`Deploy at ${miPrimerToken.address}`);

  await hre.run("verify:verify", {
    address: miPrimerToken.address,
    constructorArguments: ["Mi Primer Token", "MPRMTKN"],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

3. Crear el archivo `testToken.js` dentro de la carpeta `test`

```solidity
const { expect } = require("chai");

describe("MI PRIMER TOKEN TESTING", function () {
  var MiPrimerToken, miPrimerToken;

  describe("Set up", () => {
    it("Deploys correctly", async () => {
      MiPrimerToken = await hre.ethers.getContractFactory("MiPrimerToken");
      miPrimerToken = await MiPrimerToken.deploy("Mi Primer Token", "MPRMTKN");

      await miPrimerToken.deployed();
    });
  });

  describe("Name y Symbol", () => {
    it("Retrieves correct token name", async () => {
      var tokenName = "Mi Primer Token";
      expect(await miPrimerToken.name()).to.be.equal(tokenName);
    });

    it("Retrieves correct token symbol", async () => {
      var tokenSymbol = "MPRMTKN";
      expect(await miPrimerToken.symbol()).to.be.equal(tokenSymbol);
    });
  });
});
```

Hasta aquí tenemos el script de deployment de los smart contracts, así como también el archivo de testing donde veremos una pequeña introducción al testing.

#### Comandos en Hardhat para publicar y testear

- `npx hardhat compile`: compila los smart contracts y verifica si hay algún error
- `npx hardhat clear`: limpia caché (artifacts y cache). Ayuda a solucionar errores desconocidos en el deployment
- `npx hardhat --network nombreDeLaNetwork verify seguidoDeAddres SeguidoArgsSCOptional `: verifica un contrato con argumentos en el constructor
- `npx hardhat test test/testToken.js`: corre los tests definidos en el archivo `testToken.js`
- `npx hardhat run sripts/deploy.js`: Publicará el contrato para el blockchain local que Hardhat ejecuta
- `npx hardhat --network matic run scripts/deploy.js`: A diferencia del anterior comando, en este caso la red es testnet (o Mainnet) y nos permite publicar a testnets o mainnets dependiento del argumento `--network matic`.

#### Publicando Smart Contracts

1. Correr el comando `npx hardhat --network matic run scripts/deploy.js` para publicar en Testnet El resultado que obtendríamos sería el siguiente:

   `Deploy at 0x959D7dCad2B90fC42c54d838f3d43cf06cbBBd60`

2. Automáticamente el script empezará con la verificación del mismo y nos avisará cuando esté listo

Para llegar a este lugar, podemos usar el branch `scPublicado` con el comando `git checkout scPublicado` y tendremos el código para publicar y verificar.

#### Interactuando con Smart Contracts

Dentro de Hardhat, se puede crear una conexión entre un smart contract publicado y su address para poder ejecturar o leer métodos de manera programática. Para lograr que este sea posible, se require de una conexión a un node y para ello Alchemy

Abrir una nueva ventana en el terminal. Tipear `npx hardhat console` o, si desemoa incluir una red en particular, podemos especificarlo así: `npx hardhat --network mumbai console`. De este modo, Hardhat reconocerá la configuración que se tiene para esta red en el archivo `hardhat.config.js`. Es decir, tomará el `url` y `accounts` en consideración.

```solidity
var addressSC = "0x959D7dCad2B90fC42c54d838f3d43cf06cbBBd60";
var MiPrimerToken = await ethers.getContractFactory("MiPrimerToken")
var miPrimerToken = await MiPrimerToken.attach(addressSC);

// evaluan
await miPrimerToken.name() // Mi Primer Token
await miPrimerToken.symbol() // MPTK
await miPrimerToken.totalSuppy() // 0
```

**Troubleshooting in deployment**

- El archivo `.env` no tiene las claves correctas

- La llave privada de la billetara de Metamask no cuenta con los fondos suficientes
- NodedeJS es una versión antigua
