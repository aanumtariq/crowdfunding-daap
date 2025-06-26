# 🚀 CrowdFund DApp

A decentralized crowdfunding platform built with Ethereum smart contracts and React, allowing users to contribute ETH to category-based campaigns with full transparency and no third-party interference.

## 🧾 Features

- Contribute ETH to campaign categories (e.g., Health, Education)
- Campaign creator can withdraw funds only if the goal is met
- Contributors can get refunds if the goal is not met after the deadline
- Real-time campaign statistics
- Wallet connection via MetaMask

## 🛠️ Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Frontend      | React.js, HTML, CSS      |
| Smart Contract| Solidity (v0.8.x)        |
| Wallet        | MetaMask                 |
| Library       | Ethers.js                |
| Deployment    | Hardhat, Sepolia Testnet |



## Steps how to run
Crowdfunding DApp - Hardhat + MetaMask + Frontend

Steps:
1. Run `npm install` inside root folder.
2. Run `npx hardhat node`
3. Deploy: `npx hardhat run scripts/deploy.js --network localhost`
4. Copy deployed address to frontend/app.js in contractAddress variable.
5. Open frontend/index.html in browser (with MetaMask enabled)

## 🔐 Smart Contract Overview

```solidity
function contribute(string memory category) public payable
function withdraw() public
function refund() public
function getBalance() public view returns (uint)

