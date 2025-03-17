import { Select } from "@chakra-ui/react";
import {
  type Chain,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
} from "viem/chains";
import { useChain } from "../hooks/useChain";

const chains: Chain[] = [
  mainnet,
  sepolia,
  base,
  baseSepolia,
  optimism,
  optimismSepolia,
  arbitrum,
  arbitrumSepolia,
];

const ChainSelector = () => {
  const { chain, setChain } = useChain();
  return (
    <Select
      value={chain.id}
      onChange={(e) => {
        const selectedChain = chains.find(
          (c) => c.id === Number.parseInt(e.target.value)
        );
        if (selectedChain) setChain(selectedChain);
      }}
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
