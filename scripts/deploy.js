import hre from "hardhat";

const freeVotingContract = await hre.ethers.getContractFactory("FreeVoting");

const deployedContract = await freeVotingContract.deploy(
	"Qui gagnera les prochaines élections présidentielles ?",
	["Marie Le Pen", "Jordan Bardella", "Jean-Luc Mélenchon", "Edouard Philippe", "Jean Lassalle", "Gabriel Attal"],
	1
)

await deployedContract.waitForDeployment();

console.log("freeVoting deployed to:", deployedContract.target);