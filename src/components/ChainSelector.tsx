import React from "react";
import { Select } from "@chakra-ui/react";
import {
  Chain,
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  blast,
  blastSepolia,
  base,
  baseSepolia,
  manta,
  mantaTestnet,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
  zkSync,
  zkSyncSepoliaTestnet,
} from "viem/chains";

interface ChainSelectorProps {
  selectedChain: Chain;
  onChainChange: (chain: Chain) => void;
}

const chains: Chain[] = [
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  blast,
  blastSepolia,
  base,
  baseSepolia,
  manta,
  mantaTestnet,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
  zkSync,
  zkSyncSepoliaTestnet,
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
