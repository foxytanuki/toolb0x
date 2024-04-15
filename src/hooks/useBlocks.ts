import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Block, createPublicClient, http } from "viem";
import { Chain } from "viem/chains";
import { getBlockNumberFromTimestamp } from "../utils/getBlockNumberFromTimestamp";

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
  { blockNumber, timestamp, limit = 1 }: UseBlocksOptions = {},
  chain: Chain
) => {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const [latestBlockNumber, setLatestBlockNumber] = useState<bigint>();

  useEffect(() => {
    const fetchLatestBlockNumber = async () => {
      const blockNumber = await client.getBlockNumber();
      setLatestBlockNumber(blockNumber);
    };

    fetchLatestBlockNumber();
  }, [chain, client]);

  return useQuery<BlockData[]>({
    queryKey: ["blocks", chain.id, blockNumber?.toString(), timestamp, limit],
    queryFn: async () => {
      if (blockNumber !== undefined) {
        // Fetch a single block by block number
        const block = await client.getBlock({ blockNumber });
        return [transformBlock(block)];
      } else if (timestamp !== undefined) {
        // Fetch a single block by timestamp
        const blockNumber = await getBlockNumberFromTimestamp(chain, timestamp);
        const block = await client.getBlock({ blockNumber });
        return [transformBlock(block)];
      } else if (latestBlockNumber !== undefined) {
        // Fetch a list of blocks with pagination
        const offset = limit;
        const startBlockNumber = BigInt(
          Math.max(Number(latestBlockNumber) - offset - limit + 1, 0)
        );
        const endBlockNumber = BigInt(
          Math.max(Number(latestBlockNumber) - offset, 0)
        );

        const blockNumbers = Array.from(
          { length: Number(endBlockNumber - startBlockNumber) + 1 },
          (_, i) => BigInt(Number(startBlockNumber) + i)
        );

        const blocks = await Promise.all(
          blockNumbers.map((blockNumber) => client.getBlock({ blockNumber }))
        );
        return blocks.map(transformBlock).reverse();
      } else {
        return [];
      }
    },
    enabled: latestBlockNumber !== undefined,
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
