const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

  // ✅ Only pass duration now (goal is fixed inside contract)
  const crowdfunding = await Crowdfunding.deploy(1); // 1 minute duration

  await crowdfunding.waitForDeployment();

  const address = await crowdfunding.getAddress();
  console.log(`✅ Contract Deployed to: ${address}`);
}

main().catch((error) => {
  console.error("❌ Deployment Failed:", error);
  process.exitCode = 1;
});
