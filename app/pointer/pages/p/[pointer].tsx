import { AspectRatio, Avatar, Box, Center } from "@chakra-ui/react";
import { useParam } from "blitz";

function Pointer() {
  const pointer = useParam("pointer", "string");

  // query for pointer data with suspense fallback
  const data = { name: "Matt Condon" };

  return (
    <Box as="main" maxWidth={["full", "2xl"]} marginX="auto">
      <AspectRatio
        ratio={16 / 9}
        maxHeight={48}
        minHeight={24}
        // bgGradient="linear(to-b, #A8E8FF 0%, #FF6AEB 50%)"
      >
        <Center>
          <Avatar name={data.name} />
        </Center>
      </AspectRatio>
    </Box>
  );
}

export default Pointer;
