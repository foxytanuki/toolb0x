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
import { useChain } from "../hooks/useChain";

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
