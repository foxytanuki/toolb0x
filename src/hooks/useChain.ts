import { useContext } from "react";
import { ChainContext } from "../contexts/ChainContext";

export const useChain = () => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};
