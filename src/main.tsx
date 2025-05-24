import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BlockProvider } from './contexts/BlockContext';
import { ChainProvider } from './contexts/ChainContext';
import { RefetchProvider } from './contexts/RefetchContext';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import theme from './theme';

// Create a new router instance
const router = createRouter({ routeTree });

const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
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
