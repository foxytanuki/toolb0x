import { useEffect } from "react";
import { Box, IconButton, useColorMode, Text } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import ChainSelector from "./ChainSelector";
import { useBlock } from "../hooks/useBlock";
import { useChain } from "../hooks/useChain";
import { createPublicClient, http } from "viem";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { block, setBlock } = useBlock();
  const { chain } = useChain();
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  useEffect(() => {
    const fetchLatestBlockNumber = async () => {
      const blockNumber = await client.getBlockNumber();
      setBlock(blockNumber);
    };

    fetchLatestBlockNumber();
  }, [chain, client, setBlock]);

  return (
    <Box
      as="header"
      w="98%"
      bg="blue.500"
      color="white"
      py={4}
      m={4}
      borderRadius={"md"}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box ml={4}>
          <Text>Block: {block.toString()}</Text>
        </Box>
        <Box display="flex" justifyContent="end" ml={4} mr={4}>
          <Box mr={4}>
            <ChainSelector />
          </Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            color="white"
          />
        </Box>
      </Box>
    </Box>
  );
}
