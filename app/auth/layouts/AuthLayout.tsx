import { Box, Center } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Box as="main" w="full">
      <Center p={4}>
        <Box w={["full", "md"]}>{children}</Box>
      </Center>
    </Box>
  );
}
