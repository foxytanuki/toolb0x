import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import type { Block } from "viem";
import type { Chain } from "viem/chains";
import { getBlockNumberFromTimestamp } from "../utils/getBlockNumberFromTimestamp";
import { useBlock } from "./useBlock";

export interface BlockData {
  number: bigint;
  timestamp: bigint;
  txCount: number;
  gasUsed: bigint;
  gasLimit: bigint;
  baseFeePerGas: bigint | null;
  transactions: string[];
  miner: string;
}

interface UseBlocksOptions {
  blockNumber?: bigint;
  timestamp?: number;
  limit?: number;
  offset?: number;
  page?: number;
}

export const useBlocks = (
  chain: Chain,
  { blockNumber, timestamp, limit = 1 }: UseBlocksOptions = {}
) => {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const { block } = useBlock();

  return useQuery<BlockData[]>({
    queryKey: [
      "blocks",
      chain.id,
      blockNumber?.toString(),
      timestamp,
      limit,
      block.toString(),
    ],
    queryFn: async () => {
      if (blockNumber !== undefined) {
        // Fetch a single block by block number
        const block = await client.getBlock({ blockNumber });
        return [transformBlock(block)];
      }
      if (timestamp !== undefined) {
        // Fetch a single block by timestamp
        const blockNumber = await getBlockNumberFromTimestamp(chain, timestamp);
        const block = await client.getBlock({ blockNumber });
        return [transformBlock(block)];
      }
      if (block > -1) {
        const latestBlock = await client.getBlock({ blockNumber: block });
        return [transformBlock(latestBlock)];
      }
      return [];
    },
    enabled: block > -1,
  });
};

function transformBlock(block: Block): BlockData {
  return {
    number: block.number || BigInt(0),
    timestamp: block.timestamp,
    txCount: block.transactions.length,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
    baseFeePerGas: block.baseFeePerGas || null,
    transactions: block.transactions as string[],
    miner: block.miner as string,
  };
}
