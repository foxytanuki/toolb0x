import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ChainProvider } from "./contexts/ChainContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BlockProvider } from "./contexts/BlockContext";
import { RefetchProvider } from "./contexts/RefetchContext";

// Create a new router instance
const router = createRouter({ routeTree });

const queryClient = new QueryClient();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ChakraProvider theme={theme}>
        <ChainProvider>
          <BlockProvider>
            <QueryClientProvider client={queryClient}>
              <RefetchProvider>
                <RouterProvider router={router} />
              </RefetchProvider>
            </QueryClientProvider>
          </BlockProvider>
        </ChainProvider>
      </ChakraProvider>
    </StrictMode>
  );
}
