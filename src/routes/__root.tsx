import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Flex, VStack, useColorMode } from "@chakra-ui/react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "../index.css";

export const Route = createRootRoute({
  component: function RootComponent() {
    const { colorMode } = useColorMode();
    return (
      <>
        <div className="p-2 flex gap-2"></div>
        <Flex
          minHeight="100vh"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
        >
          <SideBar />
          <VStack w="full">
            <Header />
            <Outlet />
          </VStack>
        </Flex>
        <hr />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </>
    );
  },
});
