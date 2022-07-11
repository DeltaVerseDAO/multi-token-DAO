# Multi-Token-DAO-Smart-Contract

Multi Token DAO Smart Contract were you can vote the proposal using ERC20 or ERC721 token & you can vote with ERC20 or ERC721. You cannot use both at one time for Vote.

-There are five Contract.

- Nappy Token
- NFT Mint
- TimeLock
- Governance
- Treasury

## Nappy Token

- Token Name: Nappy Token
- Token Symbol: NPY
- Nappy Token will use to mint token and transfer to voter for voting.
- First owner will mint the token. There is no fixed supply to mint the token.
- This contract will also use for delegate the tokens. User will have to call delegate() function for voting power.

## NFT Mint

- This contract will use to mint NFt and transfer to voter for use in voting.
- First owner will mint the NFT. There is no fixed supply to mint the NFT.
- This contract will also use for delegate the NFT. User will have to call delegate() function for voting power.

## TimeLock

- This contract will set as owner of the Treasury contract.
- It will decide how many block's to wait to execute proposal.

## Governance

- This contract will take 3 argument NappyToken contract address, NFT contract address, TimeLock contract address.
- This contract will create the proposal, queue, execute and vote for the same.
- In this contact user can create the proposal, vote, cancel.
- There are several stages for proposal.

#### Stages

| Sr No | Stages      |
| :---- | :---------- |
| `0`   | `Pending`   |
| `1`   | `Active`    |
| `2`   | `Cancelled` |
| `3`   | `Defeated`  |
| `4`   | `Succeeded` |
| `5`   | `Queued`    |
| `6`   | `Expired`   |
| `7`   | `Executed`  |

- First of all we will deploy the contract. We will get contract address of all deploy contract.

```bash
  npx hardhat run scripts/deploy.js --network ropsten
```

- `Nappy Token`: `0x516a6FDCA5504489888c51Da244678411cF38Fe2`,
- `NFT Contract`: `0x0c85214E55324d86395A8148Fe4FB395f185Ae02`,
- `TimeLock Contract`: `0xf43d582A34BfD50395CB8A96150E54a89D507BE3`,
- `Governance Contract`: `0x4dDe5bc62a29DE1e7aE84902E8D0ddA7Fb0D03fE`,
- `TREASURY Contract`: `0x7dfBd09387E7b903edb40db98515bAF8c3158722`,

- After this we will call deploy createProposal scripts.

```bash
  npx hardhat run scripts/createProposal.js --network ropsten
```

- After this function we will get proposal Id.

- `Proposal Id` : `63443021524830328481685862710718740376614608430634741687791276264061360147468`

- Now we will check state of the DAO.

- Before check the state we have to wait for to mine 20 Blocks.

```bash
  npx hardhat run scripts/checkState.js --network ropsten
```

- It will give state `1` means our proposal is `Active`.

- Now everyone will vote using castVote function.

```bash
  npx hardhat run scripts/voteOnProposal.js --network ropsten
```

- Now we will check state of the DAO.

```bash
  npx hardhat run scripts/checkState.js --network ropsten
```

- It will give state `4` means our proposal is `Succeeded`.

- The voting is Succeeded.

- Now we will call the `queue` function our proposal is pass.

```bash
  npx hardhat run scripts/queueProposal.js --network ropsten
```

- It will give state `5` means our proposal is `Queued`.

- Now our proposal is in Queue.

- Now we will Execute the proposal.

```bash
  npx hardhat run scripts/executeProposal.js --network ropsten
```

- It will give state `7` means our proposal is `Executed`.

- Our proposal is successfully executed.

#### Get item

## Locker

- This contract will store the ether. Anyone can send the ether to this contract.
- Only owner can withdraw the funds.
- It transfer ownership to `TimeLock` Contract using `transferOwnership` function.

## Important Step

```bash
create .env file in root directory.
```

```bash
    API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY = "YOUR-METAMASK-PRIVATE_KEY"
    POLYGON_SCAN_API_KEY = "YOUR-ETHERSCAN_API_KEY"

```

-Get Your API Key

- [Alchemy](https://alchemy.com/?r=36af7883c4699196)

-Get Your Mumbai Faucet

- [Mumbai Faucet](https://mumbaifaucet.com/)

## NPM Packages

- [Openzeppelin](https://www.npmjs.com/package/@openzeppelin/contracts)
- [Hardhat-Ethers](https://www.npmjs.com/package/hardhat-ethers)
- [Chai](https://www.npmjs.com/package/chai)
- [Ethers](https://www.npmjs.com/package/ethers)
- [Ethereum-Waffle](https://www.npmjs.com/package/ethereum-waffle)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Hardhat-Etherscan](https://www.npmjs.com/package/@nomiclabs/hardhat-etherscan)

## Tech Stack

- [Node](https://nodejs.org/en/)
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/)
- [Openzeppelin](https://openzeppelin.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/karangorania/dao-smart-contract
```

Go to the project directory

```bash
  cd dao-smart-contract
```

Install dependencies

```bash
  npm install
```

Compile

```bash
  npx hardhat compile
```

Test

```bash
  npx hardhat test
```

Deploy

```bash
  node scripts/deploy.js
```

Deploy on Rinkeby

```bash
  npx hardhat run scripts/deploy.js --network ropsten
```

Verify Contract

```bash
npx hardhat verify --network rinkeby <YOUR_CONTRACT_ADDRESS>
```

Help

```bash
  npx hardhat help
```

# Check on Mumbai Explorer

## Deploy Contract

- [NappyToken](https://mumbai.polygonscan.com/address/0x516a6FDCA5504489888c51Da244678411cF38Fe2)
- [NFT Mint](https://mumbai.polygonscan.com/address/0x0c85214E55324d86395A8148Fe4FB395f185Ae02)
- [TimeLock](https://mumbai.polygonscan.com/address/0xf43d582A34BfD50395CB8A96150E54a89D507BE3)
- [Governance](https://mumbai.polygonscan.com/address/0x4dDe5bc62a29DE1e7aE84902E8D0ddA7Fb0D03fE)
- [Locker](https://mumbai.polygonscan.com/address/0x7dfBd09387E7b903edb40db98515bAF8c3158722)

# Transaction

## Proposal ID

- [Proposal ID](63443021524830328481685862710718740376614608430634741687791276264061360147468)

- [WithdrawETH](https://mumbai.polygonscan.com/tx/0x2b1e493272a23a2349073e98022443f157e421c0fa3838cbfc4411273e36e1b6)

## Important Step

```bash
create .env file in root directory.
```

```bash
Add this to your .env file
```

```bash
MATIC_API_URL = "https://polygon-mainnet.g.alchemy.com/v2/"
MUMBAI_API_URL = "https://polygon-mumbai.g.alchemy.com/v2/GEBGzqHSSfY13CbRHCP7GKlU04fVxsZH"
ETHEREUM_API_URL = "https://eth-mainnet.alchemyapi.io/v2/"
RINKEBY_API_URL = "https://eth-rinkeby.alchemyapi.io/v2/"
ROPSTEN_API_URL = "https://eth-ropsten.alchemyapi.io/v2/"
PRIVATE_KEY = "YOUR-METAMASK-PRIVATE_KEY"
ETHERSCAN_API_KEY = "YOUR-ETHERSCAN_API_KEY"
```

-Get Your API Key

- [Alchemy](https://alchemy.com/?r=36af7883c4699196)
- [Etherscan](https://polygonscan.com/)

-Get Your Rinkeby Faucet

- [Rinkeby Faucet](https://faucets.chain.link/rinkeby)

-Get Your Rinkeby Faucet

- [Ropsten Faucet](https://faucet.metamask.io/)

-Get Your Mumbai Faucet

- [Mumbai Faucet](https://faucet.polygon.technology/)

-Get Your Matic

- [Matic](https://matic.supply/)

## NPM Packages

- [Openzeppelin](https://www.npmjs.com/package/@openzeppelin/contracts)
- [Hardhat-Ethers](https://www.npmjs.com/package/hardhat-ethers)
- [Chai](https://www.npmjs.com/package/chai)
- [Ethers](https://www.npmjs.com/package/ethers)
- [Ethereum-Waffle](https://www.npmjs.com/package/ethereum-waffle)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Hardhat-Etherscan](https://www.npmjs.com/package/hardhat-etherscan)

## Tech Stack

- [Node](https://nodejs.org/en/)
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/)
- [Openzepplin](https://openzeppelin.com/)

## Check on Rinkeby Explorer

- [Etherscan Explorer](https://etherscan.io/)
- [Rinkeby Explorer](https://rinkeby.etherscan.io/)
- [Ropsten Explorer](https://ropsten.etherscan.io/)
- [Polygon Explorer](https://polygonscan.com/)
- [Polygon Explorer](https://mumbai.polygonscan.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/karangorania/hardhat-boilerplate
```

Go to the project directory

```bash
  cd hardhat-boilerplate
```

Install dependencies

```bash
  npm install
```

Compile

```bash
  npx hardhat compile
```

Test

```bash
  npx hardhat test
```

Deploy

```bash
  node scripts/deploy.js
```

Deploy on Ropsten

```bash
  npx hardhat run scripts/deploy.js --network ropsten
```

Deploy on Rinkeby

```bash
  npx hardhat run scripts/deploy.js --network rinkeby
```

Deploy on Mumbai

```bash
  npx hardhat run scripts/deploy.js --network mumbai
```

Deploy on Ropsten

```bash
  npx hardhat run scripts/deploy.js --network matic
```

Help

```bash
  npx hardhat help
```
