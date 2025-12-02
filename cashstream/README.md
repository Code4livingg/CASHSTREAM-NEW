# CashStream - Autonomous Payment Streaming on Massa

<div align="center">

**The Future of Automated Payments on Blockchain**

*Stream payments autonomously with self-executing smart contracts on the Massa network*

[![Massa](https://img.shields.io/badge/Massa-Buildnet-6ee7ff?style=for-the-badge)](https://massa.net)
[![AssemblyScript](https://img.shields.io/badge/AssemblyScript-Smart_Contracts-b388ff?style=for-the-badge)](https://www.assemblyscript.org/)
[![React](https://img.shields.io/badge/React-Frontend-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Powered-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## What is CashStream?

**CashStream** is a revolutionary decentralized payment streaming platform built on the Massa blockchain. It enables truly autonomous, self-executing payment flows without relying on external schedulers, oracles, or manual triggers. 

Unlike traditional payment systems that require constant human intervention or centralized services, CashStream leverages Massa's unique **autonomous smart contract** capabilities to create payment streams that execute themselves at predefined intervals—completely on-chain, completely trustless.

### Key Features

- **Autonomous Execution** - Smart contracts that trigger themselves without external intervention
- **Real-time Streaming** - Continuous payment flows at customizable intervals
- **Fully Decentralized** - No oracles, no keepers, no centralized services
- **Beautiful UI/UX** - Modern, responsive interface with stunning animations
- **Live Analytics** - Track payment cycles, total payouts, and next triggers in real-time
- **Glassmorphism Design** - Sleek, futuristic interface with neon accents
- **Instant Deployment** - Deploy and start streaming in minutes

### Use Cases

- **Salary Streaming** - Pay employees in real-time as they work
- **Subscription Services** - Automated recurring payments for SaaS, memberships, or content
- **Vesting Schedules** - Token vesting with automated distribution
- **Rental Payments** - Automated monthly rent or lease payments
- **DCA (Dollar Cost Averaging)** - Automated investment strategies
- **Freelancer Payments** - Milestone-based or time-based compensation
- **Charitable Donations** - Recurring donations to causes you care about

---

## Architecture

### Smart Contract Layer (AssemblyScript)
The core payment streaming logic is implemented in AssemblyScript and deployed on Massa's blockchain:

- **`createStream()`** - Initialize a new payment stream with receiver, amount, and interval
- **`executePayment()`** - Self-triggering function that processes payments autonomously
- **`cancelStream()`** - Terminate an active stream and clean up storage
- **On-chain Storage** - All stream data stored directly on the blockchain

### Frontend Layer (React + TypeScript + Vite)
A modern, responsive web interface featuring:

- **Animated Splash Screen** - Eye-catching intro with floating coins and streaming effects
- **Wallet Integration** - Seamless connection with Massa wallets
- **Stream Management** - Create, monitor, and cancel payment streams
- **Real-time Analytics** - Live tracking of payment cycles and totals
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile

---

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Massa wallet with some test tokens

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Code4livingg/CashStream.git
cd CashStream
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install && cd ..
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
WALLET_SECRET_KEY="your_wallet_secret_key"
JSON_RPC_URL_PUBLIC=https://test.massa.net/api/v2:33035
```

Create a `.env` file in the `frontend` directory:
```env
VITE_CASHSTREAM_ADDRESS="deployed_contract_address"
VITE_MASSA_RPC_URL=https://test.massa.net/api/v2:33035
VITE_PRIVATE_KEY="your_private_key"
```

4. **Build and deploy the smart contract**
```bash
npm run build
npm run deploy
```

5. **Launch the frontend**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to access the application.

---

## UI/UX Highlights

### Splash Screen Animation
A captivating intro featuring:
- Floating coin animations
- Glowing stream effect
- Gradient text with "CashStream" branding
- Smooth progress bar
- Seamless fade transition to main app

### Modern Interface
- **Glassmorphism Design** - Frosted glass effects with subtle transparency
- **Neon Accents** - Cyan and purple gradient highlights
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Responsive Layout** - Optimized for all screen sizes
- **Real-time Updates** - Live stream status and analytics

---

## How It Works

1. **Connect Wallet** - Link your Massa wallet to the dApp
2. **Create Stream** - Set receiver address, payment amount, and interval
3. **Autonomous Execution** - The smart contract self-triggers at each interval
4. **Monitor Progress** - Track cycles completed, total payout, and next trigger
5. **Cancel Anytime** - Stop the stream and reclaim control

### Smart Contract Flow

```
createStream() → Storage (receiver, amount, interval, counter)
                    ↓
            scheduleNextPayment()
                    ↓
            executePayment() ← Self-triggers
                    ↓
            Check interval → Process payment
                    ↓
            Increment counter
                    ↓
            scheduleNextPayment() ← Loop continues
```

---

## Development

### Build Smart Contracts
```bash
npm run build
```

### Deploy to Massa Network
```bash
npm run deploy
```

### Run Tests
```bash
npm run test
```

### Format Code
```bash
npm run fmt
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Project Structure

```
CashStream/
├── assembly/
│   └── contracts/
│       └── main.ts              # Smart contract logic
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SplashScreen.tsx # Animated splash screen
│   │   │   └── SplashScreen.css
│   │   ├── App.tsx              # Main application
│   │   ├── App.css              # Styling
│   │   └── main.tsx             # Entry point
│   └── package.json
├── src/
│   └── deploy.ts                # Deployment script
├── .env                         # Backend config
└── package.json
```

---

## Technology Stack

### Blockchain
- **Massa** - High-performance blockchain with autonomous smart contracts
- **AssemblyScript** - TypeScript-like language for smart contracts
- **massa-web3** - JavaScript library for Massa interaction

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **CSS3** - Advanced styling with animations

---

## Security Considerations

- All payment logic is executed on-chain
- No private keys are stored in the frontend
- Smart contract storage is immutable once deployed
- Users maintain full control over their streams
- Open-source and auditable code

---

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Acknowledgments

- **Massa Labs** - For building an incredible blockchain platform
- **AssemblyScript Team** - For the smart contract language
- **React Community** - For the amazing frontend ecosystem

---

## Contact & Support

- **GitHub Issues** - Report bugs or request features
- **Massa Discord** - Join the community
- **Documentation** - [Massa Docs](https://docs.massa.net)

---

<div align="center">

**Built with passion on Massa Blockchain**

*Making autonomous payments a reality, one stream at a time*

[Star this repo](https://github.com/Code4livingg/CashStream) | [Report Bug](https://github.com/Code4livingg/CashStream/issues) | [Request Feature](https://github.com/Code4livingg/CashStream/issues)

</div>
