🚀 CashStream — Autonomous Crypto Streaming on Massa
Smart contract–driven automated payments with interval scheduling and self-triggering logic.
🔥 Overview
CashStream is a decentralized payment streaming dApp built on the Massa Blockchain using Autonomous Smart Contracts (ASCs).
It allows a user to create automated streams of crypto payments where the contract triggers itself, sending funds to a receiver at fixed intervals.
Frontend built using React + TypeScript + Vite.
Backend logic powered by massa-web3.
✨ Features
⏱ Automated crypto payment streams
🔁 Self-triggering ASC logic (no cron servers needed)
🧮 Interval-based payments
⚙️ Receiver, amount, interval, counter fully configurable
🌐 Live Blockchain Status (network, account balance)
🧩 Massa Web3 integration
⚡ Fast Vite dev environment
📱 Modern UI (9:16 friendly)

🏗 Project Structure
cashstream/
│── frontend/              # React + TypeScript UI
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── lib/massa.ts   # Blockchain logic
│── smart-contract/        # ASC backend logic
│   ├── main.ts            # Autonomous smart contract
│── public/
│── package.json
│── vite.config.ts
│── README.md
🔧 Tech Stack
Layer	Stack
Frontend	React, TypeScript, Vite
Blockchain	Massa, massa-web3
Smart Contracts	Autonomous Smart Contracts (ASC)
Wallet	Private key (S1 format)
Dev Tools	Node.js, npm
