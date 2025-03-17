import { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { generateAddresses } from "../utils/getAddress";

const AddressGenerator: React.FC = () => {
  const { colorMode } = useColorMode();

  const [privateKey, setPrivateKey] = useState("");
  const [invalidKey, setInvalidKey] = useState(false);
  const [addresses, setAddresses] = useState([""]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(event.target.value);
    const cleanPrivateKey = event.target.value.startsWith("0x")
      ? event.target.value.slice(2)
      : event.target.value;
    if (cleanPrivateKey.length === 64) {
      setInvalidKey(false);
    } else {
      setInvalidKey(true);
    }
  };

  const handleGenerateAddress = () => {
    const addresses = generateAddresses(privateKey);
    setAddresses([
      addresses.ethereumAddress || "",
      addresses.bitcoinMainnetP2PKHAddress || "",
      addresses.bitcoinMainnetP2WPKHAddress || "",
      addresses.bitcoinTestnetP2PKHAddress || "",
      addresses.bitcoinTestnetP2WPKHAddress || "",
    ]);
  };

  return (
    <>
      <Heading>Address Generator</Heading>
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
          {invalidKey && <p style={{ color: "red" }}>Invalid private key</p>}
          <HStack>
            <Input
              placeholder="Enter your private key"
              value={privateKey}
              onChange={handleInputChange}
            />
            <Button onClick={handleGenerateAddress} isDisabled={invalidKey}>
              Generate Address
            </Button>
          </HStack>
          <VStack>
            <Heading size="lg">Addresses</Heading>
            {addresses.map((address) => (
              <p key={address}>{address}</p>
            ))}
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default AddressGenerator;
