import React from "react";
import { Box, Heading, Text, VStack, HStack, Link } from "@chakra-ui/react";
// import TransactionGasStats from "./TransactionGasStats";
import TransactionList from "./TransactionList";
import { BlockData } from "../hooks/useBlocks";
import { Chain, PublicClient } from "viem";

interface BlockInfoProps {
  block: BlockData;
  chain: Chain;
  client: PublicClient;
}

const BlockInfo: React.FC<BlockInfoProps> = ({ block, chain, client }) => {
  const explorerUrl = chain.blockExplorers?.default?.url;
  const explorerName = chain.blockExplorers?.default?.name;

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" fontFamily="Jersey 25">
          Block:{" "}
          <Link
            href={`${explorerUrl}/block/${block.number.toString()}`}
            isExternal
          >
            {block.number.toString()}
          </Link>
        </Heading>
        <Text>
          <strong>Timestamp:</strong>{" "}
          {new Date(Number(block.timestamp) * 1000).toLocaleString()}
        </Text>
        <Text>
          <strong>Transaction Count:</strong> {block.txCount}
        </Text>
        <Text>
          <strong>Gas Used:</strong> {block.gasUsed.toString()}
        </Text>
        <Text>
          <strong>Gas Limit:</strong> {block.gasLimit.toString()}
        </Text>
        {block.baseFeePerGas !== null && (
          <Text>
            <strong>Base Fee Per Gas:</strong> {block.baseFeePerGas.toString()}
          </Text>
        )}
        <Text>
          <strong>Miner:</strong>{" "}
          {explorerUrl ? (
            <Link
              href={`${explorerUrl}/address/${block.miner}`}
              isExternal
              color="blue.500"
            >
              {block.miner}
            </Link>
          ) : (
            block.miner
          )}
        </Text>
        {/* <TransactionGasStats client={client} blockNumber={block.number} /> */}
        <TransactionList transactions={block.transactions} chain={chain} />

        <HStack>
          <Box>
            <Text fontSize="xs" color="gray.500">
              Block data retrieved via RPC:{" "}
              <Link href={client.transport.url} isExternal>
                {client.transport.url}
              </Link>
              ,
            </Text>
          </Box>
          <Box>
            {explorerName && (
              <Text fontSize="xs" color="gray.500">
                Miner and transaction details provided by {explorerName}
              </Text>
            )}
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BlockInfo;
