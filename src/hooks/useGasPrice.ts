import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { Chain } from "viem/chains";
import { useBlock } from "./useBlock";
import { useRefetch } from "./useRefetch";

export const useGasPrice = (chain: Chain) => {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const { block } = useBlock();
  const { refetchInterval } = useRefetch();

  return useQuery<bigint, Error>({
    queryKey: ["gasPrice", chain.id],
    queryFn: async () => {
      if (block > -1n) {
        const gasPrice = await client.getGasPrice();
        return gasPrice;
      } else {
        return 0n;
      }
    },
    refetchInterval,
    enabled: block > -1n,
  });
};
