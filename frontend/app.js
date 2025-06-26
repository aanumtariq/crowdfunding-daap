let provider;
let signer;
let contract;
let currentAccount;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  "function contribute(string memory category) public payable",
  "function withdraw() public",
  "function refund() public",
  "function getBalance() public view returns (uint)",
  "function owner() public view returns (address)",
  "function goal() public view returns (uint)",
  "function deadline() public view returns (uint)",
  "function contributions(address) public view returns (uint)"
];

// Connect Wallet
document.getElementById("connect").onclick = async () => {
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    currentAccount = await signer.getAddress();

    contract = new ethers.Contract(contractAddress, abi, signer);

    const ownerAddress = await contract.owner();
    const isOwner = currentAccount.toLowerCase() === ownerAddress.toLowerCase();

    // Update UI
    const statusEl = document.getElementById("status");
    statusEl.innerText = `Connected: ${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
    statusEl.classList.add("connected");

    document.getElementById("withdraw").style.display = isOwner ? "block" : "none";

    // Show campaign status
    await updateCampaignStatus();
  } catch (err) {
    console.error("Connection error:", err);
    alert("Wallet connection failed.");
  }
};

// Contribute
document.getElementById("contribute").onclick = async () => {
  try {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (!amount || isNaN(amount)) return alert("Enter a valid ETH amount.");
    if (!category || category === "Select Category") return alert("Please select a category.");

    const tx = await contract.contribute(category, {
      value: ethers.parseEther(amount.toString())
    });
    await tx.wait();
    alert("Contribution successful!");
    await updateCampaignStatus();
  } catch (err) {
    console.error("Contribute error:", err);
    alert("Contribution failed!");
  }
};

// Withdraw
document.getElementById("withdraw").onclick = async () => {
  try {
    const tx = await contract.withdraw();
    await tx.wait();
    alert("Withdrawal successful!");
    await updateCampaignStatus();
  } catch (err) {
    console.error("Withdraw error:", err);
    alert("Withdrawal failed!");
  }
};

// Refund
document.getElementById("refund").onclick = async () => {
  try {
    const tx = await contract.refund();
    await tx.wait();
    alert("Refund successful!");
    await updateCampaignStatus();
  } catch (err) {
    console.error("Refund error:", err);
    alert("Refund failed!");
  }
};

// Update campaign status and show refund logic
async function updateCampaignStatus() {
  try {
    const goal = await contract.goal();
    const balance = await contract.getBalance();
    const deadline = await contract.deadline();
    const contribution = await contract.contributions(currentAccount);
    const currentTime = Math.floor(Date.now() / 1000);

    const goalEth = ethers.formatEther(goal);
    const raisedEth = ethers.formatEther(balance);
    const userContriEth = ethers.formatEther(contribution);

    document.getElementById("goalStatus").innerText = ` Goal: ${goalEth} ETH`;
    document.getElementById("raisedStatus").innerText = ` Raised: ${raisedEth} ETH`;
    document.getElementById("userContribution").innerText = ` You contributed: ${userContriEth} ETH`;

    if (currentTime > deadline) {
      document.getElementById("deadlineStatus").innerText = `⌛ Deadline Passed`;
    } else {
      const secondsLeft = deadline - currentTime;
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      document.getElementById("deadlineStatus").innerText = `⏱️ Time Left: ${minutes}m ${seconds}s`;
    }

    // Show refund button if valid
    const refundBtn = document.getElementById("refund");
    const refundAllowed = (currentTime > deadline) && (balance < goal) && (contribution > 0);
    refundBtn.style.display = refundAllowed ? "block" : "none";
  } catch (err) {
    console.error("Status update error:", err);
  }
}
