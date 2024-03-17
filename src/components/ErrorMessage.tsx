import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionAlert = motion(Alert);

interface ErrorMessageProps {
  title?: string;
  message: string;
  details?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error!",
  message,
  details,
}) => {
  return (
    <MotionAlert
      status="error"
      mt={4}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {details && (
          <AlertDescription mt={2} fontSize="sm">
            <strong>Details:</strong> {details}
          </AlertDescription>
        )}
      </Box>
    </MotionAlert>
  );
};

export default ErrorMessage;
