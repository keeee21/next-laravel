import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaHome, FaUser } from "react-icons/fa";

import NextLink from "next/link";
import { ROUTER_PATH } from "../routes/index";

export function Header() {
  return (
    <Box bg="twitter.500" w="100%" p={4} color="white">
      <Flex justifyContent="space-between">
        <Flex>
          <Text fontSize="lg" fontWeight="bold">
            X Clone
          </Text>
        </Flex>
        <Flex>
          <NextLink href={`${ROUTER_PATH.DASHBOARD}`}>
            <IconButton aria-label="Home" icon={<FaHome />} bg="transparent" _hover={{ bg: "twitter.600" }} />
          </NextLink>
          <NextLink href={`${ROUTER_PATH.PROFILE}`}>
            <IconButton aria-label="Profile" icon={<FaUser />} bg="transparent" _hover={{ bg: "twitter.600" }} />
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
}
