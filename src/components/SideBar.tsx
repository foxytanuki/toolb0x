import {
  Box,
  Button,
  VStack,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

export default function SideBar() {
  const { colorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  if (!isLargerThan768) return null;

  return (
    <Box width="250px" bg={colorMode === 'light' ? 'white' : 'gray.800'} p={4}>
      <VStack spacing={4}>
        <Box width="100%">
          <Link to="/">
            <Box
              as="h1"
              fontSize={['2xl', '3xl', '4xl']}
              fontWeight="extrabold"
              color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
              textAlign="center"
              mt={3}
              mb={6}
            >
              Toolb0x
            </Box>
          </Link>
        </Box>
        <Box width="100%">
          <Link to="/fee" className="[&.active]:font-bold">
            <Button width="100%" colorScheme="blue" variant="ghost" size="md">
              GasFee
            </Button>
          </Link>
        </Box>
        <Box width="100%">
          <Link to="/blocks" className="[&.active]:font-bold">
            <Button width="100%" colorScheme="blue" variant="ghost" size="md">
              BlockSearch
            </Button>
          </Link>
        </Box>
        <Box width="100%">
          <Link to="/address" className="[&.active]:font-bold">
            <Button width="100%" colorScheme="blue" variant="ghost" size="md">
              AddressGenerator
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}
