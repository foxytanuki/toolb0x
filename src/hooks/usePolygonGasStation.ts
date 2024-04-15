import { useQuery } from "@tanstack/react-query";
import { Chain, polygon, polygonAmoy } from "viem/chains";

const getPolygonGasStation = async (chain: Chain) => {
  if (chain.id == polygon.id) {
    const url = "https://gasstation.polygon.technology/";
    const response = await fetch(url);
    const data = await response.json();
    return data.fast;
  } else if (chain.id === polygonAmoy.id) {
    const url = "https://gasstation-testnet.polygon.technology/amoy";
    const response = await fetch(url);
    const data = await response.json();
    return data.fast.maxFee;
  }
  return 0;
};

export const usePolygonGasStation = (chain: Chain) => {
  return useQuery<number, Error>({
    queryKey: [chain],
    queryFn: async () => {
      const gas = await getPolygonGasStation(chain);
      return gas;
    },
  });
};
