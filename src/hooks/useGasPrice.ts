import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { Chain } from "viem/chains";

export const useGasPrice = (chain: Chain) => {
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

  return useQuery<bigint, Error>({
    queryKey: ["gasPrice", chain.id],
    queryFn: async () => {
      if (latestBlockNumber !== undefined) {
        const gasPrice = await client.getGasPrice();
        return gasPrice;
      } else {
        return 0n;
      }
    },
    enabled: latestBlockNumber !== undefined,
  });
};
