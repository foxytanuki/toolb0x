import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  HStack,
  RadioGroup,
  Radio,
  useColorMode,
} from "@chakra-ui/react";
import { useBlocks } from "../hooks/useBlocks";
import { useChain } from "../hooks/useChain";
import BlockInfo from "./BlockInfo";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import DateTimePicker from "./DateTimePicker";
import { createPublicClient, http } from "viem";

const BlockSearch = () => {
  const { colorMode } = useColorMode();
  const { chain } = useChain();
  const [blockNumber, setBlockNumber] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [blockNumberError, setBlockNumberError] = useState<string>("");
  const [timestampError, setTimestampError] = useState<string>("");
  const [dateTime, setDateTime] = useState("");
  const [pageSize] = useState(1);
  const [timestampType, setTimestampType] = useState("unix");
  const [searchType, setSearchType] = useState("timestamp");

  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const {
    data: blocks = [],
    isLoading,
    error,
    refetch,
  } = useBlocks(
    {
      blockNumber: blockNumber ? BigInt(blockNumber) : undefined,
      timestamp: timestamp ? parseInt(timestamp, 10) : undefined,
      limit: pageSize,
    },
    chain
  );

  const handleSearch = () => {
    if (searchType === "blockNumber") {
      if (blockNumber && !/^\d+$/.test(blockNumber)) {
        setBlockNumberError("Block number must be a positive integer.");
        return;
      }
      setBlockNumberError("");
    } else {
      if (dateTime) {
        const timestamp = Math.floor(new Date(dateTime).getTime() / 1000);
        if (isNaN(timestamp)) {
          setTimestampError("Invalid UTC date and time.");
          return;
        }
        setTimestamp(timestamp.toString());
      }
      setTimestampError("");
    }
    refetch();
  };

  return (
    <Box
      as="main"
      w="98%"
      maxW={["container.sm", "container.md", "container.lg"]}
      mx="auto"
      p={[4, 6, 8]}
      bg={colorMode === "light" ? "white" : "gray.800"}
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
        {searchType === "blockNumber" ? (
          <FormControl isInvalid={!!blockNumberError}>
            <FormLabel>Block Number</FormLabel>
            <Input
              type="number"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              placeholder="Enter block number"
              size="sm"
            />
            <FormErrorMessage>{blockNumberError}</FormErrorMessage>
          </FormControl>
        ) : (
          <FormControl isInvalid={!!timestampError}>
            <FormLabel>Timestamp</FormLabel>
            <RadioGroup value={timestampType} onChange={setTimestampType}>
              <HStack spacing={4}>
                <Radio value="unix">Unix Time</Radio>
                <Radio value="datetime">Date & Time</Radio>
              </HStack>
            </RadioGroup>
            {timestampType === "unix" ? (
              <Input
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="Enter timestamp"
                size="sm"
              />
            ) : (
              <DateTimePicker value={dateTime} onChange={setDateTime} />
            )}
            <FormErrorMessage>{timestampError}</FormErrorMessage>
          </FormControl>
        )}
        <Button
          onClick={handleSearch}
          colorScheme="blue"
          size="sm"
          alignSelf="flex-end"
        >
          Search
        </Button>
      </VStack>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to fetch block data." />}
      {blocks.map((block) => (
        <Box key={block.number.toString()} mt={8}>
          <BlockInfo block={block} chain={chain} client={client} />
        </Box>
      ))}
    </Box>
  );
};

export default BlockSearch;
