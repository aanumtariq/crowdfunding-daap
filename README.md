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

## 🔐 Smart Contract Overview

```solidity
function contribute(string memory category) public payable
function withdraw() public
function refund() public
function getBalance() public view returns (uint)
