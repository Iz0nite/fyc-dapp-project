import { ethers } from "ethers"
import { Button, Select } from "antd"
import FreeVoting from "../artifacts/contracts/FreeVoting.sol/FreeVoting.json";
import { useState } from "react";

export function FreeVotingApp ({account} : {account: ethers.JsonRpcSigner}) {
	const [question, setQuestion] = useState(false)
  const [answers, setAnswers] = useState(['']);
	const [selectedAnswer, setSelectedAnswer] = useState(undefined)
	const [votingStatus, setVotingStatus] = useState(false)
	const [remainingTime, setRemainingTime] = useState(null)

	async function constructApp() {
		try {
			const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESSE, FreeVoting.abi, account)
			setQuestion(await contract.question());
			setAnswers(await contract.getAllVotesForResponses());
			setVotingStatus(await contract.getVotingStatus());
			setRemainingTime(await contract.getRemainingTime());
		} catch (error) {
			console.error("Error during data fetching", error);
		}
	}

	async function vote() {
		try {
			if (selectedAnswer === null) {
				console.error("No answer selected");
				return;
			}
			const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESSE, FreeVoting.abi, account)
			const transaction = await contract.vote(selectedAnswer)
			console.log("Transaction : ", transaction)
			transaction.wait()
		} catch (error) {
			console.error("Error during transaction", error);
		}
	}

	return (
		<div className="flex flex-col justify-around align-center gap-8">
			{votingStatus && answers && remainingTime
				?
				<>
					{votingStatus ? <h3>You have {JSON.parse(remainingTime)} min to vote !</h3> : <h1>Voting is over !</h1>}
					<h1>Question</h1>
					<p>{question}</p>
					<Select
						placeholder="Select an answer"
						style={{width: 400}}
						value={selectedAnswer}
						onChange={setSelectedAnswer}
						options={
							answers.map(
								(answer: string, x: number) => {
									return {label: answer[0], value: x}
								}
							)}
					>
					</Select>
					<Button type="primary" className="border-white" onClick={vote}>Vote</Button>
				</>
				:
				<Button type="primary" className="border-white" onClick={constructApp}>Construct the app</Button>
			}
		</div>
	)
}