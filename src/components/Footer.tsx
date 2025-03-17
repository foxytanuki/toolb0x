import { Box, useColorMode } from '@chakra-ui/react';

export default function Footer() {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      w="86%"
      bg={colorMode === 'light' ? 'gray.200' : 'gray.800'}
      py={1}
      textAlign="right"
      position={'absolute'}
      bottom={0}
    >
      <Box as="span" mr={4} fontSize="sm">
        🦊 foxytanuki 🦝
      </Box>
    </Box>
  );
}
