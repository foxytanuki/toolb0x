import { createContext, useState, type ReactNode, useEffect } from "react";

interface RefetchContextType {
  refetchInterval: number;
  setRefetchInterval: (refetchInterval: number) => void;
}

export const RefetchContext = createContext<RefetchContextType | undefined>(
  undefined
);

export const RefetchProvider = ({ children }: { children: ReactNode }) => {
  const [refetchInterval, setRefetchInterval] = useState<number>(() => {
    const interval = localStorage.getItem("refetchInterval");
    if (interval) {
      return JSON.parse(interval);
    }
    return 3000;
  });

  useEffect(() => {
    localStorage.setItem("refetchInterval", JSON.stringify(refetchInterval));
  }, [refetchInterval]);

  return (
    <RefetchContext.Provider value={{ refetchInterval, setRefetchInterval }}>
      {children}
    </RefetchContext.Provider>
  );
};
