import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import { useFeeHistory } from "../hooks/useFeeHistory";
import { Chain } from "viem/chains";
import { formatGwei } from "viem";
import LoadingSpinner from "./LoadingSpinner";

interface FeeHistorySearchProps {
  chain: Chain;
}

const FeeHistorySearch: React.FC<FeeHistorySearchProps> = ({ chain }) => {
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

  const baseFeePerGas = feeHistory?.baseFeePerGas ?? 0n;
  const priorityFeePerGas = feeHistory?.rewards[0] ?? 0n;
  const totalFeePerGas = baseFeePerGas + priorityFeePerGas;

  return (
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
        </VStack>
      )}
    </VStack>
  );
};

export default FeeHistorySearch;
