import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  useToast,
  Spinner,
  Code,
  Heading,
  Divider,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { createPublicClient, http, formatEther, formatGwei } from "viem";
import { useChain } from "../hooks/useChain";

export default function TxExplorer() {
  const [txHash, setTxHash] = useState("");
  const [txData, setTxData] = useState<any>(null);
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { chain } = useChain();
  const toast = useToast();

  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const fetchTransactionDetails = async () => {
    if (!txHash) {
      toast({
        title: "Error",
        description: "Please enter a transaction hash",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const [transaction, transactionReceipt] = await Promise.all([
        client.getTransaction({ hash: txHash as `0x${string}` }),
        client.getTransactionReceipt({ hash: txHash as `0x${string}` }),
      ]);

      setTxData(transaction);
      setReceipt(transactionReceipt);
    } catch (error: any) {
      toast({
        title: "Error fetching transaction",
        description: error.message || "Transaction not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTxData(null);
      setReceipt(null);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: bigint) => {
    const eth = formatEther(value);
    return `${eth} ${chain?.nativeCurrency?.symbol || 'ETH'}`;
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="md">Transaction Explorer</Heading>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Enter a transaction hash to view details
            </Text>
          </CardHeader>
          <CardBody>
            <HStack>
              <Input
                placeholder="0x..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                size="lg"
              />
              <Button
                leftIcon={<SearchIcon />}
                colorScheme="blue"
                onClick={fetchTransactionDetails}
                isLoading={loading}
                size="lg"
              >
                Search
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {loading && (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
            <Text mt={4}>Fetching transaction details...</Text>
          </Box>
        )}

        {txData && receipt && !loading && (
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">Transaction Details</Heading>
                <Badge
                  colorScheme={receipt.status === "success" ? "green" : "red"}
                  fontSize="sm"
                  p={2}
                >
                  {receipt.status === "success" ? "SUCCESS" : "FAILED"}
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" mb={1}>Transaction Hash:</Text>
                  <Code p={2} borderRadius="md" fontSize="sm" wordBreak="break-all">
                    {txData.hash}
                  </Code>
                </Box>

                <Divider />

                <HStack justify="space-between">
                  <Text fontWeight="bold">Block Number:</Text>
                  <Text>{txData.blockNumber?.toString()}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Block Hash:</Text>
                  <Code fontSize="xs" wordBreak="break-all" maxW="300px">
                    {txData.blockHash}
                  </Code>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontWeight="bold">From:</Text>
                  <Code fontSize="sm">{txData.from}</Code>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">To:</Text>
                  <Code fontSize="sm">{txData.to || "Contract Creation"}</Code>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontWeight="bold">Value:</Text>
                  <Text fontWeight="medium">{formatValue(txData.value)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Gas Used:</Text>
                  <Text>{receipt.gasUsed.toString()}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Gas Price:</Text>
                  <Text>{formatGwei(txData.gasPrice || 0n)} Gwei</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Transaction Fee:</Text>
                  <Text fontWeight="medium">
                    {formatValue((txData.gasPrice || 0n) * receipt.gasUsed)}
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Nonce:</Text>
                  <Text>{txData.nonce}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold">Transaction Index:</Text>
                  <Text>{txData.transactionIndex}</Text>
                </HStack>

                {txData.input && txData.input !== "0x" && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontWeight="bold" mb={2}>Input Data:</Text>
                      <Code
                        p={3}
                        borderRadius="md"
                        fontSize="xs"
                        wordBreak="break-all"
                        display="block"
                        maxH="200px"
                        overflowY="auto"
                      >
                        {txData.input}
                      </Code>
                    </Box>
                  </>
                )}

                {receipt.logs && receipt.logs.length > 0 && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontWeight="bold" mb={2}>
                        Logs ({receipt.logs.length}):
                      </Text>
                      <VStack spacing={2} align="stretch">
                        {receipt.logs.map((log: any, index: number) => (
                          <Box
                            key={index}
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                          >
                            <Text fontSize="sm" fontWeight="medium">
                              Log #{index}
                            </Text>
                            <Text fontSize="xs" mt={1}>
                              <strong>Address:</strong> {log.address}
                            </Text>
                            <Text fontSize="xs">
                              <strong>Topics:</strong> {log.topics.length}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  </>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
}