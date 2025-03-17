import { useEffect } from "react";
import {
  Box,
  IconButton,
  useColorMode,
  Text,
  Button,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { HamburgerIcon, SunIcon, MoonIcon, TimeIcon } from "@chakra-ui/icons";
import ChainSelector from "./ChainSelector";
import { useBlock } from "../hooks/useBlock";
import { useChain } from "../hooks/useChain";
import { createPublicClient, http } from "viem";
import { useRefetch } from "../hooks/useRefetch";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { block, setBlock } = useBlock();
  const { chain } = useChain();
  const client = createPublicClient({
    chain,
    transport: http(),
  });
  const { refetchInterval, setRefetchInterval } = useRefetch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchLatestBlockNumber = async () => {
      const blockNumber = await client.getBlockNumber();
      setBlock(blockNumber);
    };
    const intervalId = setInterval(fetchLatestBlockNumber, refetchInterval);
    return () => clearInterval(intervalId);
  }, [client, setBlock, refetchInterval]);

  return (
    <>
      <Box
        as="header"
        w="98%"
        bg="blue.500"
        color="white"
        py={4}
        m={4}
        borderRadius={"md"}
        display="flex"
        alignItems="center"
      >
        {!isLargerThan768 ? (
          <>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              color="white"
              ml={2}
            />
            <Text mr={4} ml={4} fontSize="sm">
              Block: <Text> {block.toString()}</Text>
            </Text>
            <Box>
              <ChainSelector />
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text ml={4}>Block: {block.toString()}</Text>
            <Box display="flex" justifyContent="end" mr={4}>
              <ChainSelector />
              <Tooltip label="Change refetch interval">
                <Button
                  aria-label="Change refetch interval"
                  onClick={() =>
                    setRefetchInterval(refetchInterval === 3000 ? 1000 : 3000)
                  }
                  leftIcon={<TimeIcon />}
                  variant="ghost"
                  color="white"
                  ml={4}
                  mr={4}
                >
                  {refetchInterval === 3000 ? "3s" : "1s"}
                </Button>
              </Tooltip>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                color="white"
              />
            </Box>
          </Box>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent fontFamily="'Jersey 25'">
          <DrawerHeader borderBottomWidth="1px" />
          <DrawerBody>
            <VStack spacing={4}>
              <Link to="/" width="100%">
                <Box
                  as="h1"
                  fontSize={["2xl", "3xl", "4xl"]}
                  fontWeight="extrabold"
                  color={colorMode === "light" ? "gray.600" : "gray.200"}
                  textAlign="center"
                  mt={3}
                  mb={6}
                  onClick={onClose}
                >
                  Toolb0x
                </Box>
              </Link>
              <Link
                to="/fee"
                className="[&.active]:font-bold"
                width="100%"
                onClick={onClose}
              >
                <Button
                  width="100%"
                  colorScheme="blue"
                  variant="ghost"
                  size="md"
                >
                  GasFee
                </Button>
              </Link>
              <Link
                to="/blocks"
                className="[&.active]:font-bold"
                width="100%"
                onClick={onClose}
              >
                <Button
                  mb={4}
                  width="100%"
                  colorScheme="blue"
                  variant="ghost"
                  size="md"
                >
                  BlockSearch
                </Button>
              </Link>
              <Tooltip label="Change refetch interval">
                <Button
                  aria-label="Change refetch interval"
                  onClick={() =>
                    setRefetchInterval(refetchInterval === 3000 ? 1000 : 3000)
                  }
                  leftIcon={<TimeIcon />}
                  variant="ghost"
                  colorScheme={colorMode === "light" ? "blue" : "teal"}
                >
                  {refetchInterval === 3000 ? "3s" : "1s"}
                </Button>
              </Tooltip>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              fontFamily="'Jersey 25', sans-serif"
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
