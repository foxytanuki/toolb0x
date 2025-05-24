import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatGwei, formatUnits } from 'viem';
import { useChain } from '../hooks/useChain';
import { useFeeHistory } from '../hooks/useFeeHistory';
import { useGasPrice } from '../hooks/useGasPrice';
import { usePolygonGasStation } from '../hooks/usePolygonGasStation';
import { useTokenPrice } from '../hooks/useTokenPrice';
import LoadingSpinner from './LoadingSpinner';

const GasFeeDashboard = () => {
  const [gasUsage, setGasUsage] = useState<bigint>(5760000n);
  const [fee, setFee] = useState<bigint>(0n);
  const [feeUSD, setFeeUSD] = useState<number | null>(null);
  const [gasUsageOption, setGasUsageOption] =
    useState<string>('contractDeploy');
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
  const {
    price: nativeTokenPrice,
    isLoading: priceLoading,
    error: priceError,
  } = useTokenPrice(chain);

  const baseFeePerGas = feeHistory?.baseFeePerGas ?? 0n;
  const priorityFeePerGas = feeHistory?.rewards[0] ?? 0n;
  const totalFeePerGas = baseFeePerGas + priorityFeePerGas;

  useEffect(() => {
    if (gasPrice) {
      const calculatedFee = gasUsage * gasPrice;
      setFee(calculatedFee);
    } else {
      setFee(0n);
    }
  }, [gasPrice, gasUsage]);

  useEffect(() => {
    if (fee !== null && nativeTokenPrice !== null && chain) {
      const feeInNativeToken = Number.parseFloat(
        formatUnits(fee, chain.nativeCurrency.decimals)
      );
      const calculatedFeeUSD = feeInNativeToken * nativeTokenPrice;
      setFeeUSD(calculatedFeeUSD);
    } else {
      setFeeUSD(null);
    }
  }, [fee, nativeTokenPrice, chain]);

  useEffect(() => {
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

  const formatUSD = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

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
              {gasPrice?.toString() && (
                <Box>
                  <Box as="h3" fontSize="xl">
                    eth_gasPrice
                  </Box>
                  <Text>GasPrice: {formatGwei(gasPrice)} Gwei</Text>
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
                    {(
                      polygonGasStation.maxFee -
                      polygonGasStation.maxPriorityFee
                    ).toFixed(9)}{' '}
                    Gwei
                  </Text>
                  <Text>
                    MaxPriorityFee:{' '}
                    {polygonGasStation.maxPriorityFee.toFixed(9)} Gwei
                  </Text>
                  <Text>
                    MaxFee: {polygonGasStation.maxFee.toFixed(9)} Gwei
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
              <FormLabel htmlFor="gasUsageOption">
                Transaction Type / Gas Usage
              </FormLabel>
              <HStack>
                <Select
                  id="gasUsageOption"
                  value={gasUsageOption}
                  onChange={(e) => setGasUsageOption(e.target.value)}
                >
                  <option value="contractDeploy">
                    Contract Deploy - 5,760,000
                  </option>
                  <option value="mint">Mint - 200,000</option>
                  <option value="setDefaultRoyalty">
                    Set Default Royalty - 30,500
                  </option>
                  <option value="tokenTransfer">Token Transfer - 21,000</option>
                </Select>
                <Input
                  id="gasUsage"
                  type="number"
                  value={gasUsage.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    try {
                      setGasUsage(BigInt(value));
                    } catch (err: unknown) {
                      console.error('Invalid gas usage input:', value, err);
                    }
                  }}
                  placeholder="Custom Gas Usage"
                />
              </HStack>
            </FormControl>
            <Box mt={4}>
              {gasPriceLoading ? (
                <Spinner size="sm" />
              ) : fee !== null && chain ? (
                <Text>
                  Estimated Fee:{' '}
                  {formatUnits(fee, chain.nativeCurrency.decimals)}{' '}
                  {chain.nativeCurrency.symbol}
                  {priceLoading ? (
                    <Spinner size="xs" ml={2} />
                  ) : feeUSD !== null ? (
                    ` (~${formatUSD(feeUSD)})`
                  ) : priceError ? (
                    <Text as="span" color="red.500" ml={2}>
                      (Price Error)
                    </Text>
                  ) : (
                    <Text as="span" ml={2}>
                      (USD N/A)
                    </Text>
                  )}
                </Text>
              ) : (
                <Text>Calculating fee...</Text>
              )}
              {priceError && !priceLoading && (
                <Text color="red.500" fontSize="sm">
                  Could not load USD price: {priceError.message}
                </Text>
              )}
            </Box>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default GasFeeDashboard;
