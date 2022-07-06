const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MultiTokenDAO', () => {
  let ERC20VotingToken;
  let erc20VotingToken;
  let ERC721VotingToken;
  let erc721VotingToken;
  let TimeLock;
  let timeLock;
  let treasury;
  let Treasury;
  let MultiTokenDAO;
  let multiTokenDAO;
  let propId;

  beforeEach(async () => {
    [owner, proposer, executor, vote1, vote2, vote3, vote4, vote5, vote6] =
      await ethers.getSigners();

    // ERC20 Token contract
    ERC20VotingToken = await ethers.getContractFactory('ERC20VotingToken');
    erc20VotingToken = await ERC20VotingToken.deploy();
    await erc20VotingToken.deployed();
    erc20VotingTokenAddress = erc20VotingToken.address;

    // ERC721 Token contract
    ERC721VotingToken = await ethers.getContractFactory('ERC721VotingToken');
    erc721VotingToken = await ERC721VotingToken.deploy();
    await erc721VotingToken.deployed();
    erc721VotingTokenAddress = erc721VotingToken.address;

    // TimeLock contract
    TimeLock = await hre.ethers.getContractFactory('TimeLock');
    timeLock = await TimeLock.deploy(
      1,
      [],
      ['0x0000000000000000000000000000000000000000']
    );

    await timeLock.deployed();
    timeLockAddress = timeLock.address;

    // MultiTokenDAO Contract
    MultiTokenDAO = await hre.ethers.getContractFactory('MultiTokenDAO');
    multiTokenDAO = await MultiTokenDAO.deploy(
      'MultiTokenDAO', // Dao name.
      [erc20VotingTokenAddress, erc721VotingTokenAddress], // Voting token addresses.
      4, // Quorum Percentage => 1-100 %.
      0, // Vote Extension in number of blocks.
      0, // Voting delay in number of blocks to wait before voting starts on a proposal.
      10, // Voting period in the number of blocks.
      0, // Proposal Threshold => Minimum voting power required to create a proposal.
      timeLockAddress // Address of timelock contract, for which this dao contract would be given the role of proposer.
    );

    await multiTokenDAO.deployed();

    multiTokenDAOAddress = multiTokenDAO.address;

    // Treasury Contract (wallet address for accept the ETH or withdraw)
    Treasury = await hre.ethers.getContractFactory('Treasury');
    treasury = await Treasury.deploy();

    await treasury.deployed();

    treasuryAddress = treasury.address;

    // send ether to locker
    const transactionHash = await owner.sendTransaction({
      to: treasuryAddress,
      value: ethers.utils.parseEther('1.0'),
    });

    await transactionHash.wait();

    console.log(transactionHash);

    await treasury.transferOwnership(timeLockAddress);

    await erc721VotingToken.mint(executor.address, '');
    await erc721VotingToken.mint(vote1.address, '');
    await erc721VotingToken.mint(vote2.address, '');
    await erc721VotingToken.mint(vote3.address, '');
    await erc721VotingToken.mint(vote4.address, '');
    await erc721VotingToken.mint(vote5.address, '');
    await erc721VotingToken.mint(vote6.address, '');

    await erc20VotingToken.mint(executor.address, 100000000);
    await erc20VotingToken.mint(vote1.address, 100000000);
    await erc20VotingToken.mint(vote2.address, 100000000);
    await erc20VotingToken.mint(vote3.address, 100000000);
    await erc20VotingToken.mint(vote4.address, 100000000);
    await erc20VotingToken.mint(vote5.address, 100000000);
    await erc20VotingToken.mint(vote6.address, 100000000);

    await erc721VotingToken.connect(executor).delegate(executor.address);
    await erc721VotingToken.connect(vote1).delegate(vote1.address);
    await erc721VotingToken.connect(vote2).delegate(vote2.address);
    await erc721VotingToken.connect(vote3).delegate(vote3.address);
    await erc721VotingToken.connect(vote4).delegate(vote4.address);
    await erc721VotingToken.connect(vote5).delegate(vote5.address);
    await erc721VotingToken.connect(vote6).delegate(vote6.address);

    await erc20VotingToken.connect(executor).delegate(executor.address);
    await erc20VotingToken.connect(vote1).delegate(vote1.address);
    await erc20VotingToken.connect(vote2).delegate(vote2.address);
    await erc20VotingToken.connect(vote3).delegate(vote3.address);
    await erc20VotingToken.connect(vote4).delegate(vote4.address);
    await erc20VotingToken.connect(vote5).delegate(vote5.address);
    await erc20VotingToken.connect(vote6).delegate(vote6.address);

    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      multiTokenDAOAddress
    );
  });

  it('Should mint the NFT ', async () => {
    await erc721VotingToken.mint(executor.address, '');
    await erc721VotingToken.mint(vote1.address, '');
    await erc721VotingToken.mint(vote2.address, '');
    await erc721VotingToken.mint(vote3.address, '');
    await erc721VotingToken.mint(vote4.address, '');
    await erc721VotingToken.mint(vote5.address, '');
    await erc721VotingToken.mint(vote6.address, '');
  });

  it('Should mint the ERC20 Token ', async () => {
    await erc20VotingToken.mint(executor.address, 100000000);
    await erc20VotingToken.mint(vote1.address, 100000000);
    await erc20VotingToken.mint(vote2.address, 100000000);
    await erc20VotingToken.mint(vote3.address, 100000000);
    await erc20VotingToken.mint(vote4.address, 100000000);
    await erc20VotingToken.mint(vote5.address, 100000000);
    await erc20VotingToken.mint(vote6.address, 100000000);
  });

  it('Should delegate the NFT ', async () => {
    await erc721VotingToken.connect(executor).delegate(executor.address);
    await erc721VotingToken.connect(vote1).delegate(vote1.address);
    await erc721VotingToken.connect(vote2).delegate(vote2.address);
    await erc721VotingToken.connect(vote3).delegate(vote3.address);
    await erc721VotingToken.connect(vote4).delegate(vote4.address);
    await erc721VotingToken.connect(vote5).delegate(vote5.address);
    await erc721VotingToken.connect(vote6).delegate(vote6.address);
  });

  it('Should delegate the ERC20 Token ', async () => {
    await erc20VotingToken.connect(executor).delegate(executor.address);
    await erc20VotingToken.connect(vote1).delegate(vote1.address);
    await erc20VotingToken.connect(vote2).delegate(vote2.address);
    await erc20VotingToken.connect(vote3).delegate(vote3.address);
    await erc20VotingToken.connect(vote4).delegate(vote4.address);
    await erc20VotingToken.connect(vote5).delegate(vote5.address);
    await erc20VotingToken.connect(vote6).delegate(vote6.address);
  });

  it('Should grant the role ', async () => {
    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      multiTokenDAOAddress
    );
  });

  it('Should propose the DAO ', async () => {
    const txnPro = await multiTokenDAO.propose(
      [treasuryAddress],
      [0],
      [
        await treasury.interface.encodeFunctionData('sendEther', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      'Twitter Buy'
    );

    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await multiTokenDAO.connect(executor).castVote(0, propId, 1);
    await multiTokenDAO.connect(vote1).castVote(0, propId, 1);
    await multiTokenDAO.connect(vote2).castVote(0, propId, 1);
    await multiTokenDAO.connect(vote3).castVote(0, propId, 1);

    await multiTokenDAO.connect(vote4).castVote(1, propId, 1);
    await multiTokenDAO.connect(vote5).castVote(1, propId, 1);
    await multiTokenDAO.connect(vote6).castVote(1, propId, 1);

    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');

    const state1 = await multiTokenDAO.state(propId);
    console.log(state1);

    // latest block
    // const latestBlock = await hre.ethers.provider.getBlock('latest');
    // console.log(latestBlock);

    // const deadline = await multiTokenDAO.proposalDeadline(propId);
    // console.log(deadline);

    await multiTokenDAO.queue(
      [treasuryAddress],
      [0],
      [
        await treasury.interface.encodeFunctionData('sendEther', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Twitter Buy'))
    );

    const propState = await multiTokenDAO.state(propId);
    console.log(propState);

    await network.provider.send('evm_mine');

    await multiTokenDAO.execute(
      [treasuryAddress],
      [0],
      [
        treasury.interface.encodeFunctionData('sendEther', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Twitter Buy'))
    );

    const propState1 = await multiTokenDAO.state(propId);
    console.log(propState1);
  });

  it('Should not duplicate vote ', async () => {
    const txnPro = await multiTokenDAO.propose(
      [treasuryAddress],
      [0],
      [
        await treasury.interface.encodeFunctionData('sendEther', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      'Twitter Buy'
    );
    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await multiTokenDAO.connect(vote1).castVote(0, propId, 1);
    expect(multiTokenDAO.connect(vote1).castVote(1, propId, 0)).to.be.reverted;
  });

  it('Should defeated the proposal', async () => {
    const txnPro = await multiTokenDAO.propose(
      [treasuryAddress],
      [0],
      [
        await treasury.interface.encodeFunctionData('sendEther', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      'Twitter Buy'
    );
    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await multiTokenDAO.connect(executor).castVote(0, propId, 0);
    await multiTokenDAO.connect(vote1).castVote(0, propId, 0);
    await multiTokenDAO.connect(vote2).castVote(0, propId, 0);
    await multiTokenDAO.connect(vote3).castVote(0, propId, 0);

    await multiTokenDAO.connect(vote4).castVote(1, propId, 0);
    await multiTokenDAO.connect(vote5).castVote(1, propId, 0);
    await multiTokenDAO.connect(vote6).castVote(1, propId, 0);

    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');

    const state1 = await multiTokenDAO.state(propId);
    console.log(state1);

    expect(
      multiTokenDAO.queue(
        [treasuryAddress],
        [0],
        [
          await treasury.interface.encodeFunctionData('sendEther', [
            owner.address,
            ethers.utils.parseUnits('1', 18),
          ]),
        ],
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Twitter Buy'))
      )
    ).to.be.reverted;

    const propState = await multiTokenDAO.state(propId);
    console.log(propState);

    await network.provider.send('evm_mine');

    expect(
      multiTokenDAO.execute(
        [treasuryAddress],
        [0],
        [
          treasury.interface.encodeFunctionData('sendEther', [
            owner.address,
            ethers.utils.parseUnits('1', 18),
          ]),
        ],
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Twitter Buy'))
      )
    ).to.be.reverted;

    const propState1 = await multiTokenDAO.state(propId);
    console.log(propState1);
  });
});
