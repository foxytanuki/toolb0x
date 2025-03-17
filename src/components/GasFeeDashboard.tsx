import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useFeeHistory } from '../hooks/useFeeHistory';
import { usePolygonGasStation } from '../hooks/usePolygonGasStation';
import { formatGwei } from 'viem';
import LoadingSpinner from './LoadingSpinner';
import { useChain } from '../hooks/useChain';
import { useGasPrice } from '../hooks/useGasPrice';

const GasFeeDashboard = () => {
  const [gasUsage, setGasUsage] = useState<bigint>(5760000n);
  const [fee, setFee] = useState<bigint>(0n);
  const [gasUsageOption, setGasUsageOption] = useState<string>('contractDeploy');
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

  useEffect(() => {
    if (gasPrice) {
      const fee = (gasUsage * gasPrice) / 1000000000n;
      setFee(fee);
    }
  }, [gasPrice, gasUsage]);

  useEffect(() => {
    // gasUsageOptionの変更に応じてgasUsageを更新
    switch (gasUsageOption) {
      case 'contractDeploy':
        setGasUsage(5760000n);
        break;
      case 'mint':
        setGasUsage(200000n);
        break;
      case 'setDefaultRoyalty':
        setGasUsage(30500n);
        break;
      case 'tokenTransfer':
        setGasUsage(21000n);
        break;
      default:
        break;
    }
  }, [gasUsageOption]);

  return (
    <>
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
          <Box fontSize="xx-large">Gas Fee Dashboard</Box>
          {isLoading && <LoadingSpinner />}
          {error && <Text color="red.500">Error: {error.message}</Text>}
          {feeHistory && (
            <VStack spacing={3} align="stretch">
              <Box>
                <Box as="h3" fontSize="xl">
                  eth_feeHistory
                </Box>
                <Text>BaseFeePerGas: {formatGwei(baseFeePerGas)} Gwei</Text>
                <Text>Rewards: {formatGwei(priorityFeePerGas)} Gwei</Text>
                <Text>Total: {formatGwei(totalFeePerGas)} Gwei</Text>
              </Box>
              {gasPriceLoading && <LoadingSpinner />}
              {gasPrice?.toString && (
                <Box>
                  <Box as="h3" fontSize="xl">
                    eth_gasPrice
                  </Box>
                  <Text>GasPrice: {formatGwei(gasPrice)}Gwei</Text>
                </Box>
              )}
              {polygonGasStationLoading && <LoadingSpinner />}
              {polygonGasStation && (
                <Box>
                  <Box as="h3" fontSize="xl">
                    Polygon Gas Station (Fast)
                  </Box>
                  <Text>
                    BaseFee:{' '}
                    {(polygonGasStation.maxFee - polygonGasStation.maxPriorityFee).toFixed(9)}
                    Gwei
                  </Text>
                  <Text>MaxPriorityFee: {polygonGasStation.maxPriorityFee.toString()}Gwei</Text>
                  <Text>
                    MaxFee: {polygonGasStation.maxFee.toString()}
                    Gwei
                  </Text>
                </Box>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
      <Box
        as="main"
        w="100%"
        maxW={['container.sm', 'container.md', 'container.lg']}
        mx="auto"
        mt={4}
        p={[4, 6, 8]}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        borderRadius="md"
        boxShadow="base"
      >
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontSize="xx-large">Transaction Fee Calculator</Text>
          </Box>
          <Box>
            <FormControl>
              <FormLabel htmlFor="gasUsage">Gas Usage</FormLabel>
              <HStack>
                <Select
                  id="gasUsageOption"
                  value={gasUsageOption}
                  onChange={(e) => setGasUsageOption(e.target.value)}
                >
                  <option value="contractDeploy">Contract Deploy - 5,760,000</option>
                  <option value="mint">Mint - 200,000</option>
                  <option value="setDefaultRoyalty">Set Default Royalty - 30,500</option>
                  <option value="tokenTransfer">Token Transfer - 21,000</option>
                </Select>
                <Input
                  id="gasUsage"
                  type="number"
                  value={gasUsage.toString()}
                  onChange={(e) => setGasUsage(BigInt(e.target.value))}
                />
              </HStack>
            </FormControl>
            {fee !== null && (
              <Text mt={4}>
                Transaction Fee: {formatGwei(fee)} {chain.nativeCurrency.symbol}
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default GasFeeDashboard;
