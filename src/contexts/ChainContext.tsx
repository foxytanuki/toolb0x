import { createContext, useState, ReactNode, useEffect } from 'react';
import { Chain, mainnet } from 'viem/chains';

interface ChainContextType {
  chain: Chain;
  setChain: (chain: Chain) => void;
}

export const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [chain, setChain] = useState<Chain>(() => {
    const chain = localStorage.getItem('chain');
    if (chain) {
      return JSON.parse(chain);
    }
    return mainnet;
  });

  useEffect(() => {
    localStorage.setItem('chain', JSON.stringify(chain));
  }, [chain]);

  return <ChainContext.Provider value={{ chain, setChain }}>{children}</ChainContext.Provider>;
};
