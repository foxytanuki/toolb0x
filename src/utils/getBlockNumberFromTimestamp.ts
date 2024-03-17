import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export async function getBlockNumberFromTimestamp(
  timestamp: number
): Promise<bigint> {
  const latestBlock = await client.getBlock();
  const latestBlockTimestamp = latestBlock.timestamp;

  if (timestamp > latestBlockTimestamp) {
    throw new Error("Timestamp is in the future");
  }

  let low = BigInt(0);
  let high = latestBlock.number;

  while (low < high) {
    const mid = (low + high) / BigInt(2);
    const block = await client.getBlock({ blockNumber: mid });
    const blockTimestamp = block.timestamp;

    if (blockTimestamp < timestamp) {
      low = mid + BigInt(1);
    } else {
      high = mid;
    }
  }

  return high;
}
