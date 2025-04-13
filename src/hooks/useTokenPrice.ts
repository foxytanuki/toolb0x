import { useState, useEffect } from "react";
import type { Chain } from "viem";

// Define mapping from chain ID to CoinGecko asset platform ID and native token ID
const chainToCoinGeckoId: Record<
  number,
  { platformId: string; tokenId: string }
> = {
  1: { platformId: "ethereum", tokenId: "ethereum" }, // Ethereum Mainnet
  137: { platformId: "polygon-pos", tokenId: "matic-network" }, // Polygon Mainnet
  80001: { platformId: "polygon-pos", tokenId: "matic-network" }, // Polygon Mumbai (Note: Using mainnet token ID for price)
  11155111: { platformId: "ethereum", tokenId: "ethereum" }, // Sepolia (Note: Using mainnet token ID for price)
  // Add other chains as needed
};

export const useTokenPrice = (chain: Chain | undefined) => {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!chain || !chainToCoinGeckoId[chain.id]) {
        setPrice(null); // Reset price if chain is not supported or undefined
        return;
      }

      const { tokenId } = chainToCoinGeckoId[chain.id];
      setIsLoading(true);
      setError(null);

      try {
        // Use a proxy if running into CORS issues locally, or fetch directly
        // const response = await fetch(`/api/coingecko/simple/price?ids=${tokenId}&vs_currencies=usd`);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data?.[tokenId]?.usd) {
          setPrice(data[tokenId].usd);
        } else {
          throw new Error("Invalid data format received from CoinGecko");
        }
      } catch (e) {
        console.error("Failed to fetch token price:", e);
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
        setPrice(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrice();
    // Optional: Set up an interval to refresh the price periodically
    // const intervalId = setInterval(fetchPrice, 60000); // Refresh every 60 seconds
    // return () => clearInterval(intervalId);
  }, [chain]); // Re-fetch when chain changes

  return { price, isLoading, error };
};
