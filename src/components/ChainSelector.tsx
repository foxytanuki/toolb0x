import React from "react";
import { Select } from "@chakra-ui/react";
import {
  Chain,
  goerli,
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  polygonAmoy,
} from "viem/chains";

interface ChainSelectorProps {
  selectedChain: Chain;
  onChainChange: (chain: Chain) => void;
}

const chains: Chain[] = [
  mainnet,
  goerli,
  sepolia,
  polygon,
  polygonMumbai,
  polygonAmoy,
];

const ChainSelector: React.FC<ChainSelectorProps> = ({
  selectedChain,
  onChainChange,
}) => {
  return (
    <Select
      value={selectedChain.id}
      onChange={(e) =>
        onChainChange(chains.find((c) => c.id === parseInt(e.target.value))!)
      }
    >
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </Select>
  );
};

export default ChainSelector;
