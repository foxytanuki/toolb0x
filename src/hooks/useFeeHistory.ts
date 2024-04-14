import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { Chain } from "viem/chains";

interface FeeHistoryData {
  baseFeePerGas: bigint;
  gasUsedRatio: number;
  oldestBlock: bigint;
  rewards: bigint[];
}

interface UseFeeHistoryOptions {
  blockCount: number;
}

export const useFeeHistory = (
  { blockCount }: UseFeeHistoryOptions,
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

  return useQuery<FeeHistoryData, Error>({
    queryKey: ["feeHistory", chain.id, blockCount],
    queryFn: async () => {
      if (latestBlockNumber !== undefined) {
        const rewardPercentiles = [75];
        const { baseFeePerGas, gasUsedRatio, oldestBlock, reward } =
          await client.getFeeHistory({
            blockCount,
            rewardPercentiles,
          });
        const feeHistory: FeeHistoryData = {
          baseFeePerGas: baseFeePerGas[0],
          gasUsedRatio: gasUsedRatio[0],
          oldestBlock,
          rewards: reward ? reward[0] : [],
        };
        return feeHistory;
      } else {
        throw new Error("latestBlockNumber is undefined");
      }
    },
    enabled: latestBlockNumber !== undefined,
  });
};
