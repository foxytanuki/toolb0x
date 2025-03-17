import type React from "react";
import { Spinner, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const LoadingSpinner: React.FC = () => {
  return (
    <MotionFlex
      justify="center"
      mt={8}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Spinner size="xl" />
    </MotionFlex>
  );
};

export default LoadingSpinner;
