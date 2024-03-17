import React from "react";
import { Box, VStack, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlockSearch from "./components/BlockSearch";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <QueryClientProvider client={queryClient}>
      <Box
        minHeight="100vh"
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
      >
        <VStack spacing={8}>
          <Box
            as="header"
            w="100%"
            bg="blue.500"
            color="white"
            py={4}
            px={[4, 6, 8]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box as="h1" fontSize={["xl", "2xl", "3xl"]} fontWeight="bold">
                Toolb0x
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
            <BlockSearch />
          </Box>
          <Box
            as="footer"
            w="100%"
            bg={colorMode === "light" ? "gray.200" : "gray.700"}
            py={4}
            px={[4, 6, 8]}
            textAlign="center"
            color={colorMode === "light" ? "gray.600" : "gray.400"}
          >
            🦊 foxytanuki 🦝
          </Box>
        </VStack>
      </Box>
    </QueryClientProvider>
  );
};

export default App;
