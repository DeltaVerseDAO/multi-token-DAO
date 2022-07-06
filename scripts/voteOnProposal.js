const { ethers } = require('hardhat');
const { DAO_ADDRESS, PROPOSAL_ID } = require('./addresses.js');

async function main() {
  [owner, proposer, executor, vote1, vote2, vote3, vote4, vote5, vote6] =
    await ethers.getSigners();

  // Get the MultiTokenDAO contract and attach deployed address
  const MultiTokenDAO = await ethers.getContractFactory('MultiTokenDAO');
  const multiTokenDAO = await MultiTokenDAO.attach(DAO_ADDRESS);

  // Check proposal state before voting. 1 -> Proposal voting active
  console.log(
    'Proposal state before voting: ',
    await multiTokenDAO.state(PROPOSAL_ID)
  );

  /*
   *  castVote(tokenIndex, proposalId, support);
   *
   *  tokenIndex => index of token using to vote in votingTokens array.
   *   [See contracts/governance/extensions/GovernorVotes.sol]
   *      * tokenIndex = 0 --> ERC20VotingToken
   *      * tokenIndex = 1 --> ERC721VotingToken
   *
   *  proposalId => id of proposal to vote on.
   *
   *  support => whether to vote against, in favor, or abstain.
   *      * support = 0 --> against the proposal
   *      * support = 1 --> in support of the proposal
   *      * support = 2 --> abstain from voting
   *
   *     # Both in favor and abstain votes count towards quorum.
   */

  // Now vote in support of proposal with 3 addresses using ERC20VotingToken.
  await multiTokenDAO.connect(executor).castVote(0, PROPOSAL_ID, 1);
  await multiTokenDAO.connect(vote1).castVote(0, PROPOSAL_ID, 1);
  await multiTokenDAO.connect(vote2).castVote(0, PROPOSAL_ID, 1);
  await multiTokenDAO.connect(vote3).castVote(0, PROPOSAL_ID, 1);

  // Now vote against the proposal with 3 addresses using ERC721VotingToken.
  await multiTokenDAO.connect(vote4).castVote(1, PROPOSAL_ID, 0);
  await multiTokenDAO.connect(vote5).castVote(1, PROPOSAL_ID, 0);
  await multiTokenDAO.connect(vote6).castVote(1, PROPOSAL_ID, 0);

  console.log('-> Voting on proposal completed');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
