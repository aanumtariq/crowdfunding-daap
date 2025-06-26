// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public owner;
    uint public goal;
    uint public deadline;

    mapping(address => uint) public contributions;
    mapping(string => uint) public categoryTotals;

    constructor(uint _durationInMinutes) {
        owner = msg.sender;
        goal = 100 ether; // 🎯 Goal is now fixed to 100 ETH
        deadline = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyBeforeDeadline() {
        require(block.timestamp < deadline, "Deadline passed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    // ✅ Contribute to a specific category
    function contribute(string memory category) public payable onlyBeforeDeadline {
        require(msg.value > 0, "Contribution must be greater than 0");

        contributions[msg.sender] += msg.value;
        categoryTotals[category] += msg.value;
    }

    // ✅ Owner can withdraw only if goal is met
    function withdraw() public onlyOwner {
        require(address(this).balance >= goal, "Goal not reached");
        payable(owner).transfer(address(this).balance);
    }

    // ✅ Contributors can get refund if goal not reached after deadline
    function refund() public {
        require(block.timestamp >= deadline, "Campaign still active");
        require(address(this).balance < goal, "Goal was met, refund not available");

        uint amount = contributions[msg.sender];
        require(amount > 0, "No contributions to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
