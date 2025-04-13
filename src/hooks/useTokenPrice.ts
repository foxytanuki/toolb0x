import { useState, useEffect } from "react";
import type { Chain } from "viem";
import { PriceFeed, ChainlinkProvider } from "@foxytanuki/crypto-price";

// Define mapping from chain ID to CoinGecko asset platform ID and native token ID
const chainToCoinGeckoId: Record<
  number,
  { platformId: string; tokenId: string }
> = {
  1: { platformId: "ethereum", tokenId: "ethereum" }, // Ethereum Mainnet
  11155111: { platformId: "ethereum", tokenId: "ethereum" }, // Sepolia (Note: Using mainnet token ID for price)
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

      // const { tokenId } = chainToCoinGeckoId[chain.id];
      setIsLoading(true);
      setError(null);

      try {
        const chainlinkProvider = new ChainlinkProvider({
          baseUrl: "https://ethereum-rpc.publicnode.com",
        });
        const priceFeed = await PriceFeed.create([chainlinkProvider]);

        // TODO: Add support for other chains
        const price = await priceFeed.getPrice("ETH/USD");
        setPrice(price.price);
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
