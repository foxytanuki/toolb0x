import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import ChainSelector from "./ChainSelector";
import { Chain } from "viem/chains";

export default function Header({
  selectedChain,
  onChainChange,
}: {
  selectedChain: Chain;
  onChainChange: (chain: Chain) => void;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Box display="flex" justifyContent="end" ml={4} mr={4}>
        <Box mr={4}>
          <ChainSelector
            selectedChain={selectedChain}
            onChainChange={onChainChange}
          />
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
  );
}
