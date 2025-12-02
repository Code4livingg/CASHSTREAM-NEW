import pkg from "@massalabs/massa-web3";
const { WalletClient, Wallet, Account } = pkg;
import dotenv from "dotenv";
dotenv.config();

export function getWallet() {
  const privateKey = process.env.VITE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Missing VITE_PRIVATE_KEY in .env");
  }

  const account = Account.fromPrivateKey(privateKey);

  const wallet = WalletClient
    ? new WalletClient(account)
    : new Wallet(account);

  return { account, wallet };
}
