import { Box, Flex } from "@chakra-ui/react";

function FlexBox({ children }) {
  return (
    <Flex align="center" justify="center">
      {children}
    </Flex>
  );
}

export default FlexBox;
