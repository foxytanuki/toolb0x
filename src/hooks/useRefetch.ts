import { useContext } from "react";
import { RefetchContext } from "../contexts/RefetchContext";

export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
};
