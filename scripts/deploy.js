import hre from "hardhat";

const freeVotingContract = await hre.ethers.deployContract("FreeVoting");

await freeVotingContract.waitForDeployment();

console.log("freeVoting deployed to:", freeVotingContract.target);