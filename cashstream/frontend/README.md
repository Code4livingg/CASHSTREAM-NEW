# CashStream Frontend

A production-ready Web3 dApp for autonomous payment streams on the Massa blockchain.

## 🚀 Features

- ✨ Beautiful neon-futuristic design system
- 💼 Real Massa wallet integration
- 📊 Dashboard with analytics
- 💸 Active streams management
- ➕ Create new payment streams
- 📜 Stream history tracking
- 🎨 Demo mode for testing without wallet

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Massa Web3** - Blockchain integration
- **CSS Variables** - Design system

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
VITE_CASHSTREAM_ADDRESS=AS1wPVJr8xkwNXRVQELZdxrnMzoxTFbDFzg7C6DpA3z7BSH8UFMw
VITE_MASSA_RPC_URL=https://buildnet.massa.net/api/v2
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `cashstream/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variables:
   - `VITE_PRIVATE_KEY` - Your Massa private key
   - `VITE_CASHSTREAM_ADDRESS` - Smart contract address
   - `VITE_MASSA_RPC_URL` - Massa RPC endpoint

7. Click "Deploy"

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## 🎨 Demo Mode

The app includes a demo mode that works without a real wallet:

1. Click "🎨 Demo Mode" on the intro page
2. Test all features with mock data
3. No blockchain connection required

## 📱 Pages

1. **Intro Page** - Welcome screen
2. **Connect Wallet** - Massa wallet integration
3. **Dashboard** - Main hub with analytics
4. **Active Streams** - View and manage streams
5. **Create Stream** - Create new payment streams
6. **History** - View completed/canceled streams

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your private key secure
- Use environment variables in production
- Demo mode is for testing only

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📞 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ for the Massa blockchain
