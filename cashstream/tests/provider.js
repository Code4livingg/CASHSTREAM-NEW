import { JsonRpcProvider } from "@massalabs/massa-web3";
import dotenv from "dotenv";
dotenv.config();

export const provider = JsonRpcProvider.fromRPCUrl(
  process.env.MASSA_RPC,
);
