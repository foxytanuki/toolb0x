import { Select } from "@chakra-ui/react";
import {
  type Chain,
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
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
  polygon,
  polygonAmoy,
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
      onChange={(e) =>
        setChain(chains.find((c) => c.id === parseInt(e.target.value))!)
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
