import { Link } from "@tanstack/react-router";
import { Button, Box, useColorMode, useMediaQuery } from "@chakra-ui/react";

export default function SideBar() {
  const { colorMode } = useColorMode();
  const [isLargerThanX] = useMediaQuery("(min-width: 768px)"); // xを768に置き換えました

  if (!isLargerThanX) return null;

  return (
    <Box width="250px" bg={colorMode === "light" ? "white" : "gray.800"} p={4}>
      <Link to="/" width="100%">
        <Box
          as="h1"
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="extrabold"
          color={colorMode === "light" ? "gray.600" : "gray.200"}
          textAlign="center"
          mt={3}
          mb={6}
        >
          Toolb0x
        </Box>
      </Link>
      <Link to="/fee" className="[&.active]:font-bold" width="100%">
        <Button
          mb={4}
          width="100%"
          colorScheme="blue"
          variant="outline"
          size="md"
        >
          GasFee
        </Button>
      </Link>
      <Link to="/blocks" className="[&.active]:font-bold" width="100%">
        <Button
          mb={4}
          width="100%"
          colorScheme="blue"
          variant="outline"
          size="md"
        >
          BlockSearch
        </Button>
      </Link>
    </Box>
  );
}
