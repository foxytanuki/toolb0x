import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormErrorMessage,
  HStack,
  RadioGroup,
  Radio,
  useColorMode,
} from '@chakra-ui/react';
import { useChain } from '../hooks/useChain';
import BlockInfo from './BlockInfo';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import DateTimePicker from './DateTimePicker';
import { getBlockNumberFromTimestamp } from '../utils/getBlockNumberFromTimestamp';
import { createPublicClient, http, Block } from 'viem';

const BlockSearch = () => {
  const { colorMode } = useColorMode();
  const { chain } = useChain();
  const [blockNumber, setBlockNumber] = useState<bigint>(0n);
  const [block, setBlock] = useState<Block | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp, setTimestamp] = useState<string>(
    Math.floor(new Date().getTime() / 1000).toString()
  );
  const [blockNumberError, setBlockNumberError] = useState<string>('');
  const [timestampError, setTimestampError] = useState<string>('');
  const [dateTime, setDateTime] = useState('');
  const [timestampType, setTimestampType] = useState('datetime');
  const [searchType, setSearchType] = useState('timestamp');

  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const handleSearch = async () => {
    setIsLoading(true);
    if (searchType === 'timestamp') {
      if (dateTime && timestampType === 'datetime') {
        const timestamp = Math.floor(new Date(dateTime).getTime() / 1000);
        if (isNaN(timestamp)) {
          setTimestampError('Invalid UTC date and time.');
          return setIsLoading(false);
        }
        setTimestamp(timestamp.toString());
        const blockNumber = await getBlockNumberFromTimestamp(chain, timestamp);
        const block = await client.getBlock({ blockNumber });
        setBlockNumber(blockNumber);
        setBlock(block);
        return setIsLoading(false);
      }
    } else {
      if (blockNumber <= 0n) {
        setBlockNumberError('Block number must be a positive integer.');
        return setIsLoading(false);
      }
      const block = await client.getBlock({ blockNumber });
      setBlock(block);
      return setIsLoading(false);
    }
  };

  return (
    <Box
      as="main"
      w="98%"
      maxW={['container.sm', 'container.md', 'container.lg']}
      mx="auto"
      p={[4, 6, 8]}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="md"
      boxShadow="base"
    >
      <VStack spacing={4} align="stretch">
        <RadioGroup value={searchType} onChange={setSearchType}>
          <HStack spacing={4}>
            <Radio value="timestamp">Timestamp</Radio>
            <Radio value="blockNumber">Block Number</Radio>
          </HStack>
        </RadioGroup>
        {searchType === 'timestamp' ? (
          <FormControl isInvalid={!!timestampError}>
            <FormLabel>Timestamp</FormLabel>
            <RadioGroup value={timestampType} onChange={setTimestampType}>
              <HStack spacing={4}>
                <Radio value="datetime">Date & Time</Radio>
                {/* <Radio value="unix">Unix Time</Radio> */}
              </HStack>
            </RadioGroup>
            {timestampType === 'unix' ? (
              <NumberInput
                value={timestamp}
                onChange={(valueString) => setTimestamp(valueString)}
                size="sm"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              <DateTimePicker value={dateTime} onChange={setDateTime} />
            )}
            <FormErrorMessage>{timestampError}</FormErrorMessage>
          </FormControl>
        ) : (
          <FormControl isInvalid={!!blockNumberError}>
            <FormLabel>Block Number</FormLabel>
            <NumberInput
              value={blockNumber.toString()}
              onChange={(valueString) => setBlockNumber(BigInt(valueString))}
              size="sm"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{blockNumberError}</FormErrorMessage>
          </FormControl>
        )}
        <Button onClick={handleSearch} colorScheme="blue" size="sm" alignSelf="flex-end">
          Search
        </Button>
      </VStack>
      {isLoading && <LoadingSpinner />}
      {timestampError && <ErrorMessage message="Failed to fetch block data." />}
      {blockNumberError && <ErrorMessage message="Failed to fetch block data." />}
      {!isLoading && block && !blockNumberError && !timestampError && (
        <Box key={blockNumber.toString()} mt={8}>
          {block && <BlockInfo block={block} chain={chain} client={client} />}
        </Box>
      )}
    </Box>
  );
};

export default BlockSearch;
