const { ethers } = require('hardhat');

async function main() {
  [owner, proposer, executor, vote1, vote2, vote3, vote4, vote5, vote6] =
    await ethers.getSigners();

  // Deploy the ERC20VotingToken Contract
  const ERC20VotingToken = await ethers.getContractFactory('ERC20VotingToken');
  const erc20VotingToken = await ERC20VotingToken.deploy();
  await erc20VotingToken.deployed();
  console.log('-> ERC20VotingToken deployed at: ', erc20VotingToken.address);

  // Deploy the ERC721VotingToken contract.
  const ERC721VotingToken = await ethers.getContractFactory(
    'ERC721VotingToken'
  );
  const erc721VotingToken = await ERC721VotingToken.deploy();
  await erc721VotingToken.deployed();
  console.log(
    '-> ERC721VotingToken contract is deployed at: ',
    erc721VotingToken.address
  );

  // Deploy the TimeLock contract.
  const TimeLock = await ethers.getContractFactory('TimeLock');
  const timeLock = await TimeLock.deploy(
    1,
    [],
    ['0x0000000000000000000000000000000000000000']
  );
  await timeLock.deployed();
  console.log('-> TimeLock contract deployed at: ', timeLock.address);

  // Deploy the MultiTokenDAO contract.
  const MultiTokenDAO = await ethers.getContractFactory('MultiTokenDAO');
  const multiTokenDAO = await MultiTokenDAO.deploy(
    'MultiTokenDAO', // Dao name.
    [erc20VotingToken.address, erc721VotingToken.address], // Voting token addresses.
    4, // Quorum Percentage => 1-100 %.
    0, // Vote Extension in number of blocks.
    0, // Voting delay in number of blocks to wait before voting starts on a proposal.
    20, // Voting period in the number of blocks.
    0, // Proposal Threshold => Minimum voting power required to create a proposal.
    timeLock.address // Address of timelock contract, for which this dao contract would be given the role of proposer.
  );
  await multiTokenDAO.deployed();
  console.log('-> MultiTokenDAO contract deployed at: ', multiTokenDAO.address);

  // Deploy the Treasury contract.
  const Treasury = await ethers.getContractFactory('Treasury');
  const treasury = await Treasury.deploy();
  await treasury.deployed();
  console.log('-> Treasury contract deployed at: ', treasury.address);

  // ---------------------------------------------------------------

  // Make TimeLock contract the owner of Treasury contract.
  await treasury.transferOwnership(timeLock.address);
  console.log("\n-> Transferred Treasury's ownership to TimeLock contract");

  // Make MultiTokenDAO contract the proposer of TimeLock contract.
  await timeLock.grantRole(
    await timeLock.PROPOSER_ROLE(),
    multiTokenDAO.address
  );
  console.log(
    '-> Made MultiTokenDAO contract the proposer of TimeLock contract'
  );

  // Send some ethers to Treasury contract.
  const ethTxn = await owner.sendTransaction({
    to: treasury.address,
    value: ethers.utils.parseEther('1.0'),
  });
  await ethTxn.wait();
  console.log('-> Sent 1 ether to Treasury contract');

  // Minting 20 tokens to each address.
  const amount = ethers.utils.parseUnits('20');

  // Mint the ERC20 voting tokens to other addresses.
  await erc20VotingToken.mint(owner.address, amount);
  await erc20VotingToken.mint(vote1.address, amount);
  await erc20VotingToken.mint(vote2.address, amount);
  await erc20VotingToken.mint(vote3.address, amount);
  await erc20VotingToken.mint(vote4.address, amount);
  await erc20VotingToken.mint(vote5.address, amount);

  console.log('Minted ERC20 Voting Tokens!');

  // Mint the ERC721 voting tokens to other addresses.
  await erc721VotingToken.mint(owner.address, '');
  await erc721VotingToken.mint(vote1.address, '');
  await erc721VotingToken.mint(vote2.address, '');
  await erc721VotingToken.mint(vote3.address, '');
  await erc721VotingToken.mint(vote4.address, '');
  await erc721VotingToken.mint(vote5.address, '');

  console.log('Minted ERC721 voting tokens!');

  // Delegate the ERC20 voting tokens from each address to itself..
  await erc20VotingToken.connect(owner).delegate(owner.address);
  await erc20VotingToken.connect(vote1).delegate(vote1.address);
  await erc20VotingToken.connect(vote2).delegate(vote2.address);
  await erc20VotingToken.connect(vote3).delegate(vote3.address);
  await erc20VotingToken.connect(vote4).delegate(vote4.address);
  await erc20VotingToken.connect(vote5).delegate(vote5.address);

  console.log('Delegated ERC20 voting tokens!');

  // Delegate the ERC721 voting tokens from each address to itself..
  await erc721VotingToken.connect(owner).delegate(owner.address);
  await erc721VotingToken.connect(vote1).delegate(vote1.address);
  await erc721VotingToken.connect(vote2).delegate(vote2.address);
  await erc721VotingToken.connect(vote3).delegate(vote3.address);
  await erc721VotingToken.connect(vote4).delegate(vote4.address);
  await erc721VotingToken.connect(vote5).delegate(vote5.address);

  console.log('Delegated ERC721 voting tokens!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
