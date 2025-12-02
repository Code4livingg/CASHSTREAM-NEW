# 🚀 CashStream — Autonomous Crypto Streaming on Massa

**CashStream** is a decentralized payment-streaming dApp built on the **Massa Blockchain** using **Autonomous Smart Contracts (ASCs)**.  
It allows a user to create automated crypto payment streams where the contract **executes itself** at fixed intervals without any external triggers.

Frontend built using **React + TypeScript + Vite**.  
Backend logic powered by **massa-web3**.

---

## ✨ Features

- ⏱ **Automated crypto payment streams**
- 🔁 **Self-triggering ASC logic** (no cron servers)
- 🧮 **Interval-based transactions**
- ⚙️ **Configurable receiver, amount, interval, counter**
- 🌐 **Live Blockchain status** (network + balance)
- 🍀 **Massa Web3 integration**
- ⚡ **Fast Vite dev environment**
- 📱 **Modern, clean UI (9:16 friendly)**

---

## 🏗 Project Structure
cashstream/
│── frontend/
│ ├── src/
│ │ ├── main.tsx
│ │ ├── App.tsx
│ │ ├── components/
│ │ └── lib/massa.ts # Blockchain logic
│ ├── public/
│ └── vite.config.ts
│
│── smart-contract/
│ └── main.ts # Autonomous Smart Contract (ASC)
│
│── package.json
│── README.md


---

## 🔧 Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React, TypeScript, Vite              |
| Blockchain   | Massa, massa-web3                    |
| Smart Contract | Autonomous Smart Contracts (ASC)   |
| Wallet       | Private key (S1 format)              |
| Tools        | Node.js, npm                         |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/cashstream.git
cd cashstream/frontend
▶️ Usage Guide
✔ Check wallet & network
UI shows:
Network (Buildnet)
Balance
Account address
✔ Create a payment stream
Enter:
Receiver
Amount
Interval
Counter
Click Create Stream.
✔ ASC Execution
Contract wakes automatically
Executes payment
Updates counter
Ends after all intervals complete
No manual triggers required.
