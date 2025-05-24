import { http, type Chain, createPublicClient } from 'viem';

export async function getBlockNumberFromTimestamp(
  chain: Chain,
  timestamp: number
): Promise<bigint> {
  const client = createPublicClient({
    chain,
    transport: http(),
  });
  const latestBlock = await client.getBlock();
  const latestBlockTimestamp = latestBlock.timestamp;

  if (timestamp > latestBlockTimestamp) {
    throw new Error('Timestamp is in the future');
  }

  // Calculate the average block generation speed based on the all past blocks
  const firstBlock = await client.getBlock({
    blockNumber: 0n,
  });
  const firstBlockTimestamp = firstBlock.timestamp;
  const timeDifference = latestBlockTimestamp - firstBlockTimestamp;
  const averageBlockTime = timeDifference / latestBlock.number;
  const secondsDifference = latestBlockTimestamp - BigInt(timestamp);
  const estimatedBlockNumber =
    latestBlock.number - BigInt(secondsDifference / averageBlockTime);

  const threshold = 100000n;
  let low = estimatedBlockNumber - threshold;
  let high = estimatedBlockNumber + threshold;

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
