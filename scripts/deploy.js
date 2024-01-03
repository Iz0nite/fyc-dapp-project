import hre from "hardhat";

const freeVotingContract = await hre.ethers.getContractFactory("FreeVoting");

const deployedContract = await freeVotingContract.deploy(
	"Qui est le plus beau ?",
	["Moi", "Toi", "Lui", "Elle"],
	300
)

await deployedContract.waitForDeployment();

console.log("freeVoting deployed to:", deployedContract.target);