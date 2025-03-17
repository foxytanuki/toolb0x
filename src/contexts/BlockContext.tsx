import { createContext, useState, type ReactNode, useEffect } from "react";
import { useChain } from "../hooks/useChain";
import { createPublicClient, http } from "viem";

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
    client.getBlockNumber().then((blockNumber) => {
      setBlock(blockNumber);
    });
  }, [chain]);

  return (
    <BlockContext.Provider value={{ block, setBlock }}>
      {children}
    </BlockContext.Provider>
  );
};
