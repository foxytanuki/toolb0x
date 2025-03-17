import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e5e7ff',
      100: '#b9beff',
      200: '#8d93ff',
      300: '#6169ff',
      400: '#3540ff',
      500: '#0016ff',
      600: '#0012cc',
      700: '#000e99',
      800: '#000a66',
      900: '#000633',
    },
  },
  fonts: {
    heading: 'Jersey 25, sans-serif',
    body: 'Jersey 25, Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme;
