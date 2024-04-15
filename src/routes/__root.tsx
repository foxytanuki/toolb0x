import { useState } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button, Box, Flex, VStack, useColorMode } from "@chakra-ui/react";
import Header from "../components/Header";
import { Chain, mainnet } from "viem/chains";
import "../index.css";

export const Route = createRootRoute({
  component: function RootComponent() {
    const { colorMode } = useColorMode();
    const [chain, setChain] = useState<Chain>(mainnet);
    return (
      <>
        <div className="p-2 flex gap-2"></div>
        <Flex
          minHeight="100vh"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
        >
          <Box
            width="250px"
            bg={colorMode === "light" ? "white" : "gray.800"}
            p={4}
          >
            <Link to="/" width="100%">
              <Box
                as="h1"
                fontSize={["2xl", "3xl", "4xl"]}
                fontWeight="extrabold"
                color={colorMode === "light" ? "gray.600" : "gray.200"}
                textAlign="center"
                mt={3}
                mb={6}
              >
                Toolb0x
              </Box>
            </Link>
            <Link to="/fee" className="[&.active]:font-bold" width="100%">
              <Button
                mb={4}
                width="100%"
                colorScheme="blue"
                variant="outline"
                size="md"
              >
                GasFee
              </Button>
            </Link>
            <Link to="/blocks" className="[&.active]:font-bold" width="100%">
              <Button
                mb={4}
                width="100%"
                colorScheme="blue"
                variant="outline"
                size="md"
              >
                BlockSearch
              </Button>
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              <Button
                mb={4}
                width="100%"
                colorScheme="blue"
                variant="outline"
                size="md"
              >
                About
              </Button>
            </Link>
          </Box>
          <VStack w="full">
            <Header selectedChain={chain} onChainChange={setChain} />
            <Outlet />
          </VStack>
        </Flex>
        <hr />
        <TanStackRouterDevtools />
      </>
    );
  },
});
