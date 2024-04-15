import { createContext, useContext, useState, ReactNode } from "react";
import { Chain, mainnet } from "viem/chains";

interface ChainContextType {
  chain: Chain;
  setChain: (chain: Chain) => void;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [chain, setChain] = useState<Chain>(mainnet);

  return (
    <ChainContext.Provider value={{ chain, setChain }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};
