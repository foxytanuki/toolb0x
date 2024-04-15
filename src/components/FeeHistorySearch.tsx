import { Box, Text, VStack, useColorMode } from "@chakra-ui/react";
import { useFeeHistory } from "../hooks/useFeeHistory";
import { usePolygonGasStation } from "../hooks/usePolygonGasStation";
import { formatGwei } from "viem";
import LoadingSpinner from "./LoadingSpinner";
import { useChain } from "../hooks/useChain";
import { useGasPrice } from "../hooks/useGasPrice";

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
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice(chain);
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
        <Box fontSize="xx-large" fontWeight="bold">
          Gas Fee Calculator
        </Box>
        {isLoading && <LoadingSpinner />}
        {error && <Text color="red.500">Error: {error.message}</Text>}
        {feeHistory && (
          <VStack spacing={3} align="stretch">
            <Box>
              <Box as="h3" fontSize="xl" fontWeight="extrabold">
                eth_feeHistory
              </Box>
              <Text>
                <strong>BaseFeePerGas:</strong> {formatGwei(baseFeePerGas)}Gwei
              </Text>
              <Text>
                <strong>Rewards:</strong> {formatGwei(priorityFeePerGas)}Gwei
              </Text>
              <Text>
                <strong>Total:</strong> {formatGwei(totalFeePerGas)}Gwei
              </Text>
            </Box>
            {gasPriceLoading && <LoadingSpinner />}
            {gasPrice?.toString && (
              <Box>
                <Box as="h3" fontSize="xl" fontWeight="extrabold">
                  eth_gasPrice
                </Box>
                <Text>
                  <strong>GasPrice:</strong> {formatGwei(gasPrice)}Gwei
                </Text>
              </Box>
            )}
            {polygonGasStationLoading && <LoadingSpinner />}
            {polygonGasStation && (
              <Box>
                <Box as="h3" fontSize="xl" fontWeight="extrabold">
                  Polygon Gas Station
                </Box>
                <Text>
                  <strong>Fast:</strong> {polygonGasStation.toString()}Gwei
                </Text>
              </Box>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default FeeHistorySearch;
