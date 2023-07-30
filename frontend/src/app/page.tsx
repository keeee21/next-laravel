"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  chakra,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ROUTER_PATH } from "./routes/index";
import { useLogin } from "./hooks/useLogin";
import { useInput } from "./hooks/useInput";

export default function Home() {
  const router = useRouter();
  const CAiOutlineMail = chakra(AiOutlineMail);
  const CFaLock = chakra(FaLock);

  const { value: email, onChange: changeEmail } = useInput("");
  const { value: password, onChange: changePassword } = useInput("");
  const { showPassword, handleShowClick, handleLogin } = useLogin();

  const onSubmit = async () => {
    try {
      await handleLogin({ email, password });
      router.push(ROUTER_PATH.DASHBOARD);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <VStack flexDir="column" mb="2">
        <Heading color="teal.400">X Clone</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CAiOutlineMail color="gray.300"></CAiOutlineMail>} />
                <Input id="email" type="email" placeholder="email address" onChange={changeEmail} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300"></CFaLock>} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={changePassword}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" onClick={onSubmit}>
              Login
            </Button>
          </Stack>
        </Box>
      </VStack>
      <Box>
        New to us?{" "}
        <NextLink href={`${ROUTER_PATH.REGISTER}`}>
          <Text color="teal.500" display="inline">
            Sign Up
          </Text>
        </NextLink>
      </Box>
    </Flex>
  );
}
