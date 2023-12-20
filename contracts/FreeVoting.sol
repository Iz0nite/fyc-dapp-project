// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FreeVoting {
    struct Response {
        string response;
        uint256 voteCount;
    }

    string public question;
    Response[] public responses;
    address owner;
    mapping(address => bool) public voters;

    uint256 public vote_start_date;
    uint256 public vote_end_date;

    constructor(string _question ,string[] memory _availableResponses, uint256 _durationInMinutes) {
        question = _question;
        for (uint256 i = 0; i < _availableResponses.length; i++) {
            responses.push(Response({
                response: _availableResponses[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        vote_start_date = block.timestamp;
        vote_end_date = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function vote(uint256 _responseIndex) public {
        require(!voters[msg.sender], "You have already voted");
        require(_responseIndex < responses.length, "Invalid response index");

        responses[_responseIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesForResponses() public view returns (Response[] memory){
        return responses;
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
