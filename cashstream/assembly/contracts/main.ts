import { Args } from '@massalabs/as-types';
import {
  call,
  generateEvent,
  Storage,
  Context,
  isDeployingContract,
} from '@massalabs/massa-as-sdk';

const RECEIVER_KEY = 'receiver';
const AMOUNT_KEY = 'amount';
const INTERVAL_KEY = 'interval';
const COUNTER_KEY = 'counter';

export function createStream(binaryArgs: StaticArray<u8>): void {
  const args = new Args(binaryArgs);
  const receiver = args
    .nextString()
    .expect('createStream expects receiver, amount, interval');
  const amount = args
    .nextU64()
    .expect('createStream expects receiver, amount, interval');
  const interval = args
    .nextU64()
    .expect('createStream expects receiver, amount, interval');

  Storage.set(RECEIVER_KEY, receiver);
  Storage.set(AMOUNT_KEY, amount.toString());
  Storage.set(INTERVAL_KEY, interval.toString());
  Storage.set(COUNTER_KEY, '0');

  generateEvent(
    `Stream created for ${receiver} with amount ${amount} and interval ${interval}`
  );
  scheduleNextPayment();
}

// Manual call — NOT automatic
export function executePayment(_: StaticArray<u8>): void {
  const receiver = Storage.get<string>(RECEIVER_KEY);
  const amount = Storage.get<string>(AMOUNT_KEY);
  const interval = Storage.get<string>(INTERVAL_KEY);
  let counter = Storage.get<string>(COUNTER_KEY);

  const intervalValue = parseU64(interval);
  let counterValue = parseU64(counter);

  if (intervalValue > 0 && counterValue % intervalValue == 0) {
    generateEvent(`Payment executed: ${amount} to ${receiver}`);
  } else {
    generateEvent('Skipped cycle');
  }

  counterValue += 1;
  Storage.set(COUNTER_KEY, counterValue.toString());
  scheduleNextPayment();
}

function scheduleNextPayment(): void {
  // Guard: prevent scheduling during deployment to avoid gas issues
  if (isDeployingContract()) {
    return;
  }
  call(Context.callee(), 'executePayment', new Args(), 0);
}

export function cancelStream(_: StaticArray<u8>): void {
  Storage.del(RECEIVER_KEY);
  Storage.del(AMOUNT_KEY);
  Storage.del(INTERVAL_KEY);
  Storage.del(COUNTER_KEY);
  generateEvent('Stream cancelled');
}

function parseU64(value: string): u64 {
  let result: u64 = 0;
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i) - 48;
    if (charCode < 0 || charCode > 9) continue;
    result = result * 10 + <u64>charCode;
  }
  return result;
}
