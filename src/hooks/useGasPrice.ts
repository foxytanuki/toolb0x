import { useQuery } from '@tanstack/react-query';
import { http, createPublicClient } from 'viem';
import type { Chain } from 'viem/chains';
import { useBlock } from './useBlock';
import { useRefetch } from './useRefetch';

export const useGasPrice = (chain: Chain) => {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const { block } = useBlock();
  const { refetchInterval } = useRefetch();

  return useQuery<bigint, Error>({
    queryKey: ['gasPrice', chain.id],
    queryFn: async () => {
      if (block <= -1n) {
        return 0n;
      }
      const gasPrice = await client.getGasPrice();
      return gasPrice;
    },
    refetchInterval,
    enabled: block > -1n,
  });
};
