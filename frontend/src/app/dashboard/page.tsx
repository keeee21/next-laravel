"use client";

import { Box, Heading, Input, VStack, Button, Flex, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInput } from "../hooks/useInput";
import { getAllTweets } from "../api/apiService";
import { Tweet } from "../types/tweet";

export default function Dashboard() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { value: inputValue, onChange: changeInputValue } = useInput("");

  const handleTweet = () => {
    // setTweets([inputValue, ...tweets]);
  };

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsFromApi: Tweet[] = await getAllTweets();
      console.log(tweetsFromApi);
      setTweets(tweetsFromApi);
    };

    fetchTweets();
  }, []);

  return (
    <>
      <Box maxW="xl" mx="auto" mt="10" bgColor="red.100">
        <Heading mb="6">X Clone</Heading>
        <VStack spacing="6">
          <Input
            placeholder="What's happening?"
            value={inputValue}
            onChange={changeInputValue}
            required
            maxLength={140}
          />
          <Button onClick={handleTweet} colorScheme="twitter">
            Tweet
          </Button>
        </VStack>
      </Box>
      <Flex
        maxW="xl"
        mx="auto"
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        alignItems="flex-start"
      >
        <VStack mx="auto">
          <Box minW={{ base: "90%", md: "468px" }} textAlign="center">
            {tweets.map((tweet, index) => (
              <Card key={index} mt="3">
                {tweet.tweet}
              </Card>
            ))}
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
