import type React from "react";
import { Box, Link, Collapse, Button, useDisclosure } from "@chakra-ui/react";
import type { Chain } from "viem";

interface TransactionListProps {
  transactions: string[];
  chain: Chain;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  chain,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const explorerUrl = chain.blockExplorers?.default?.url;

  return (
    <Box>
      <Button onClick={onToggle} size="sm" variant="link" colorScheme="blue">
        {isOpen
          ? "Hide Transactions"
          : `Show Transactions (${transactions.length})`}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box mt={2}>
          {transactions.map((tx, index) => (
            <Box key={tx}>
              {index + 1}.{" "}
              {explorerUrl ? (
                <Link
                  href={`${explorerUrl}/tx/${tx}`}
                  isExternal
                  color="blue.500"
                >
                  {tx}
                </Link>
              ) : (
                tx
              )}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TransactionList;
