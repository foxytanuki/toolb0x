import { type ReactNode, createContext, useEffect, useState } from 'react';
import { http, createPublicClient } from 'viem';
import { useChain } from '../hooks/useChain';

interface BlockContextType {
  block: bigint;
  setBlock: (block: bigint) => void;
}

export const BlockContext = createContext<BlockContextType | undefined>(
  undefined
);

export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [block, setBlock] = useState<bigint>(-1n);
  const { chain } = useChain();

  useEffect(() => {
    const client = createPublicClient({
      chain,
      transport: http(),
    });
    client
      .getBlockNumber()
      .then((blockNumber) => {
        setBlock(blockNumber);
      })
      .catch((error) => {
        console.error('Failed to fetch block number:', error);
      });
  }, [chain]);

  return (
    <BlockContext.Provider value={{ block, setBlock }}>
      {children}
    </BlockContext.Provider>
  );
};
