# Multi-Token-DAO-Smart-Contract

## What is DAO ?

DAO stands for Decentralized Autonomous Organization an open-source Blockchain protocol governed by a set of rules, created by its members, which automatically execute certain actions without the need for intermediaries. DAO is a community-led entity with no central authority. It is fully autonomous and transparent.

In MultiToken DAO either you can vote with Token or NFT.

### There are five Contract.

- Nappy Token (ERC20Token)
- NappyNFT (ERC721Token)
- TimeLock
- Governance
- Treasury

## Nappy Token

- Token Name: Nappy Token
- Token Symbol: NPY
- Nappy Token will use to mint token and transfer to voter for use in voting.
- First owner will mint the token. There is no fixed supply to mint the token.
- This contract will also use for delegate the tokens. User will have to call delegate() function for voting power.

## NappyNFT

- Token Name: NappyNFT 
- NFT Symbol: NPY
- NappyNFt will use to mint NFT and transfer to voter for use in voting.
- First owner will mint the NFT. There is no fixed supply to mint the NFT.
- This contract will also use for delegate the NFT. User will have to call delegate() function for voting power.

## TimeLock

- This contract will set as owner of the Treasury contract.

- It will decide how many block's to wait to execute proposal.

## Governance

- This contract will create the proposal and vote for the same.
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
  npx hardhat run scripts/deploy.js --network mumbai
```

- `Nappy Token` : `0xb1E2d34eE670F4B91C8015547D4E1F1f89a61f92`
- `NappyNFT` : `0x0c85214E55324d86395A8148Fe4FB395f185Ae02`
- `TimeLock` : `0xf43d582A34BfD50395CB8A96150E54a89D507BE3`
- `Governance` : `0x4dDe5bc62a29DE1e7aE84902E8D0ddA7Fb0D03fE`
- `Treasury` : `0x7dfBd09387E7b903edb40db98515bAF8c3158722`

- After this we will call createProposal scripts.

```bash
  npx hardhat run scripts/createProposal.js --network mumbai
```

- After this function we will get proposal Id.

- `Proposal Id` : `63443021524830328481685862710718740376614608430634741687791276264061360147468`

- Now we will check state of the DAO.

- Before check the state we have to wait for to mine 20 Blocks to mine.

```bash
  npx hardhat run scripts/checkState.js --network mumbai
```

- It will give state `1` means our proposal is `Active`.

- Now everyone will vote using castVote function.

- Some will vote with NFT & some will vote with Tokens.

```bash
  npx hardhat run scripts/voteOnProposal.js --network mumbai
```

- Now we will check state of the DAO.

```bash
  npx hardhat run scripts/state.js --network mumbai
```

- It will give state `4` means our proposal is `Succeeded`.

- The voting is Succeeded.

- Now we will call the `queue` function our proposal is pass.

```bash
  npx hardhat run scripts/queueProposal.js --network mumbai
```

- It will give state `5` means our proposal is `Succeeded`.

- Now our proposal is in Queue.

- Now we will Execute the proposal.

```bash
  npx hardhat run scripts/executeProposal.js --network mumbai
```

- It will give state `7` means our proposal is `Executed`.

- Our proposal is successfully executed.

#### Get item

## Treasury

- You have to send some ether or any ERC20Token or ERC721 to Treasury.
- This contract will store the ether. Anyone can send the ether to this contract.
- Only owner can withdraw the funds.
- It transfer ownership to `TimeLock` Contract using `transferOwnership` function.

## Important Step

```bash
create .env file in root directory.
```

```bash
    API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY = "YOUR-METAMASK-MNEMONICS"
    POLYGON_SCAN_API_KEY = "YOUR-POLYGON_SCAN_API_KEY"

```

-Get Your API Key

- [Alchemy](https://alchemy.com/?r=36af7883c4699196)

-Get Your Matic Mumbai Faucet

- [Matic Mumbai Faucet](https://mumbaifaucet.com/)

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
  git clone https://github.com/karangorania/multi-token-DAO
```

Go to the project directory

```bash
  cd multi-token-DAO
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

Deploy on Mumbai

```bash
  npx hardhat run scripts/deploy.js --network mumbai
```

Verify Contract

```bash
npx hardhat verify --network mumbai <YOUR_CONTRACT_ADDRESS>
```

Help

```bash
  npx hardhat help
```

# Check on Mumbai Explorer

## Deploy Contract

- [NappyToken](https://mumbai.polygonscan.com/address/0x516a6FDCA5504489888c51Da244678411cF38Fe2)
- [NappyNFT](https://mumbai.polygonscan.com/address/0x0c85214E55324d86395A8148Fe4FB395f185Ae02)
- [TimeLock](https://mumbai.polygonscan.com/address/0xf43d582A34BfD50395CB8A96150E54a89D507BE3)
- [Governance](https://mumbai.polygonscan.com/address/0x4dDe5bc62a29DE1e7aE84902E8D0ddA7Fb0D03fE)
- [Treasury](https://mumbai.polygonscan.com/address/0x7dfBd09387E7b903edb40db98515bAF8c3158722)

# Transaction

## Proposal ID

- [Proposal ID](63443021524830328481685862710718740376614608430634741687791276264061360147468)

- [WithdrawMatic](https://mumbai.polygonscan.com/tx/0x2b1e493272a23a2349073e98022443f157e421c0fa3838cbfc4411273e36e1b6)
