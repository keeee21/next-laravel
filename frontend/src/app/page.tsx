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
  Link,
  Stack,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";

import { ChangeEvent, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

type LoginParams = {
  email: string;
  password: string;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const loginParams: LoginParams = {
      email,
      password,
    };

    axios.get("http://localhost:8083/sanctum/csrf-cookie", { withCredentials: true }).then((response) => {
      console.log("sunctom");
      axios.post("http://localhost:8083/login", loginParams, { withCredentials: true }).then((response) => {
        console.log("ログインできた");
        console.log(response.data);
      });
    });
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
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Heading color="teal.400">X Clone</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300"></CFaUserAlt>} />
                <Input id="email" type="email" placeholder="email address" onChange={changeEmail} />
              </InputGroup>
            </FormControl>
            <FormControl>
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
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
