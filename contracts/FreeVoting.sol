// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingTime {
    address adressVoting;
    address owner;
    mapping(address => bool) public voters;

    uint256 public vote_start_date;
    uint256 public vote_end_date;

    constructor(uint256 _durationInMinutes, address _addressVoting) {
        adressVoting = _addressVoting;
        owner = msg.sender;
        vote_start_date = block.timestamp;
        vote_end_date = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function vote(uint256 _responseIndex) public {
        Voting voting = Voting(adressVoting);
        require(!voters[msg.sender], "You have already voted");
        require(_responseIndex < voting.getAllVotesForResponses().length, "Invalid response index");

        voting.incrementVote(_responseIndex);
        voters[msg.sender] = true;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= vote_start_date && block.timestamp < vote_end_date);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= vote_start_date, "Vote has not started yet");
        if (block.timestamp >= vote_end_date) {
            return 0;
        }
        return vote_end_date - block.timestamp;
    }
}

contract Voting {
    struct Response {
        string response;
        uint256 voteCount;
    }

    string public question;
    Response[] public responses;

    constructor(string memory _question ,string[] memory _availableResponses) {
        question = _question;
        for (uint256 i = 0; i < _availableResponses.length; i++) {
            responses.push(Response({
                response: _availableResponses[i],
                voteCount: 0
            }));
        }
    }

    function getAllVotesForResponses() external  view returns (Response[] memory){
        return responses;
    }

    function incrementVote(uint256 _responseIndex) external {
        responses[_responseIndex].voteCount++;
    }
}