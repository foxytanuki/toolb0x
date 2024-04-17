import { useContext } from "react";
import { BlockContext } from "../contexts/BlockContext";

export const useBlock = () => {
  const context = useContext(BlockContext);
  if (context === undefined) {
    throw new Error("useBlock must be used within a BlockProvider");
  }
  return context;
};
