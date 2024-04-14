import React, { useState } from "react";
import { Box, Flex, Button, useColorMode, VStack } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlockSearch from "./components/BlockSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeeHistorySearch from "./components/FeeHistorySearch";
import { Chain, mainnet } from "viem/chains"; // Modified import to include Chain
import "./App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { colorMode } = useColorMode();
  const [selectedMenu, setSelectedMenu] = useState<string>("feeHistorySearch");
  const [chain, setChain] = useState<Chain>(mainnet);

  return (
    <QueryClientProvider client={queryClient}>
      <Flex
        minHeight="100vh"
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
      >
        <Box
          width="250px"
          bg={colorMode === "light" ? "white" : "gray.800"}
          p={4}
        >
          <Box
            as="h1"
            className="jersey-10-charted-regular"
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="extrabold"
            color={colorMode === "light" ? "gray.600" : "gray.200"}
            textAlign="center"
            mt={3}
            mb={6}
          >
            Toolb0x
          </Box>
          <Button
            onClick={() => setSelectedMenu("feeHistorySearch")}
            mb={4}
            width="100%"
            colorScheme="blue"
            variant="outline"
            size="md"
          >
            FeeHistorySearch
          </Button>
          <Button
            onClick={() => setSelectedMenu("blockSearch")}
            mb={4}
            width="100%"
            colorScheme="blue"
            variant="outline"
            size="md"
          >
            BlockSearch
          </Button>
        </Box>
        <Box flex="1">
          <Header selectedChain={chain} onChainChange={setChain} />
          <VStack spacing={8} p={8}>
            {selectedMenu === "feeHistorySearch" && (
              <Box
                as="main"
                w="100%"
                maxW={["container.sm", "container.md", "container.lg"]}
                mx="auto"
                p={[4, 6, 8]}
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="md"
                boxShadow="base"
              >
                <FeeHistorySearch chain={chain} />
              </Box>
            )}
            {selectedMenu === "blockSearch" && (
              <Box
                as="main"
                w="100%"
                maxW={["container.sm", "container.md", "container.lg"]}
                mx="auto"
                p={[4, 6, 8]}
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="md"
                boxShadow="base"
              >
                <BlockSearch chain={chain} />
              </Box>
            )}
          </VStack>
          <Footer />
        </Box>
      </Flex>
    </QueryClientProvider>
  );
};

export default App;
