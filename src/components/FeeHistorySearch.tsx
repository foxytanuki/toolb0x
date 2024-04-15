import { Box, Text, VStack, useColorMode } from "@chakra-ui/react";
import { useFeeHistory } from "../hooks/useFeeHistory";
import { usePolygonGasStation } from "../hooks/usePolygonGasStation";
import { formatGwei } from "viem";
import LoadingSpinner from "./LoadingSpinner";
import { useChain } from "../contexts/ChainContext";

const FeeHistorySearch = () => {
  const { colorMode } = useColorMode();
  const { chain } = useChain();
  const {
    data: feeHistory,
    error,
    isLoading,
  } = useFeeHistory(
    {
      blockCount: 10,
    },
    chain
  );

  const { data: polygonGasStation, isLoading: polygonGasStationLoading } =
    usePolygonGasStation(chain);

  const baseFeePerGas = feeHistory?.baseFeePerGas ?? 0n;
  const priorityFeePerGas = feeHistory?.rewards[0] ?? 0n;
  const totalFeePerGas = baseFeePerGas + priorityFeePerGas;

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
        <Text mb="4" fontSize="xl" fontWeight="bold">
          Gas Fee Calculator
        </Text>
        {isLoading && <LoadingSpinner />}
        {error && <Text color="red.500">Error: {error.message}</Text>}
        {feeHistory && (
          <VStack spacing={3} align="stretch">
            <Text>
              <strong>BaseFeePerGas:</strong> {formatGwei(baseFeePerGas)}Gwei
            </Text>
            <Text>
              <strong>Rewards:</strong> {formatGwei(priorityFeePerGas)}Gwei
            </Text>
            <Text>
              <strong>Total:</strong> {formatGwei(totalFeePerGas)}Gwei
            </Text>
            {polygonGasStationLoading && <LoadingSpinner />}
            {polygonGasStation && (
              <Text>
                <strong>Polygon Gas Station (Fast):</strong> {polygonGasStation}
                Gwei
              </Text>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default FeeHistorySearch;
