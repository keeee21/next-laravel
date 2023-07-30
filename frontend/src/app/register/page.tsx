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
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { useInput } from "../hooks/useInput";
import { useRegister } from "../hooks/useRegister";
import { ROUTER_PATH } from "../routes";

export default function Register() {
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const CAiOutlineMail = chakra(AiOutlineMail);
  const router = useRouter();
  const { value: name, onChange: changeName } = useInput("");
  const { value: email, onChange: changeEmail } = useInput("");
  const { value: password, onChange: changePassword } = useInput("");
  const { value: password_confirmation, onChange: changePasswordConfirm } = useInput("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowPasswordConfirmClick = () => setShowPasswordConfirm(!showPasswordConfirm);

  const { handleRegister } = useRegister();

  const onSubmit = async () => {
    try {
      await handleRegister({ name, email, password, password_confirmation });
      router.push(ROUTER_PATH.HOME);
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
        <Heading color="teal.400">Resister</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300"></CFaUserAlt>} />
                <Input id="name" type="name" placeholder="your name" onChange={changeName} />
              </InputGroup>
            </FormControl>
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
                  <Button h="1.75rem" size="sm" onClick={handleShowPasswordClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300"></CFaLock>} />
                <Input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Password Confirm"
                  onChange={changePasswordConfirm}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPasswordConfirmClick}>
                    {showPasswordConfirm ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" onClick={onSubmit}>
              Register
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Flex>
  );
}
