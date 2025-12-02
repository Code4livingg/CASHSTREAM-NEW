import puppeteer from "puppeteer";
import dotenv from "dotenv";
import fs from "fs";
import { provider } from "./provider.js";
import { getWallet } from "./wallet.js";
dotenv.config();

const APP_URL = "http://localhost:5174";

const CONTRACT = process.env.VITE_CONTRACT_ADDRESS;
const STREAMS_KEY = `data:${CONTRACT}:STREAMS`;

async function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function readStreams() {
  try {
    const raw = await provider.readStorage(STREAMS_KEY);

    if (!raw || raw.length === 0) {
      return null;
    }

    const decoded = Buffer.from(raw[0], "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Error reading streams:", err);
    return null;
  }
}

(async () => {
  console.log("🚀 Starting CashStream automated test...");

  const { account } = getWallet();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🔗 Opening app:", APP_URL);
  await page.goto(APP_URL, { waitUntil: "networkidle2" });

  await page.waitForSelector("#connect-wallet");

  console.log("🟦 Clicking Connect Wallet...");
  await page.click("#connect-wallet");

  await wait(1500);

  console.log("📝 Filling form...");
  await page.type("#receiver", account.address);
  await page.type("#interval", "60");
  await page.type("#amount", "1");

  console.log("▶ Submitting createStream...");
  await page.click("#create-stream");

  console.log("⏳ Waiting for blockchain processing...");
  await wait(6000);

  const streams = await readStreams();

  if (streams && streams.length > 0) {
    console.log("🎉 STREAM CREATED SUCCESSFULLY");
    console.log(streams);
  } else {
    console.log("❌ Failed: STREAM DID NOT APPEAR in STORAGE");
  }

  const screenshotPath = "./tests/screenshots/stream_success.png";
  await page.screenshot({ path: screenshotPath });
  console.log("📸 Screenshot saved to:", screenshotPath);

  await browser.close();
})();
