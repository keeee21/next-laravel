"use client";

import { Box, Heading, Input, VStack, Button, Flex, Card, Alert, AlertIcon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { useInput } from "../hooks/useInput";
import { getAllTweets, postTweet } from "../api/apiService";
import { Tweet } from "../types/tweet";
import { Header } from "../components/Header";

export default function Dashboard() {
  const [reloadTweets, setReloadTweets] = useState(false);
  const [error, setError] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { value: inputValue, onChange: changeInputValue } = useInput("");

  // ツイートする
  const handleTweet = async () => {
    try {
      const response = await postTweet(inputValue);
      if (response.status == "200") {
        setReloadTweets((prev) => !prev);
      }
    } catch (err) {
      setError("ツイートに失敗しました。再度試してください");
    }
  };

  // ツイートを全件取得する
  const fetchTweets = useCallback(async () => {
    try {
      const tweetsFromApi: Tweet[] = await getAllTweets();
      setTweets(tweetsFromApi);
    } catch (err) {
      setError("ツイートの取得に失敗しました。画面を再読み込みしてください");
    }
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets, reloadTweets]);

  return (
    <>
      <Header />
      <Box maxW="xl" mx="auto" mt="10" bgColor="teal.100">
        <Heading mb="6">X Clone</Heading>
        {error && (
          <Alert status="error" borderRadius="md" my="4">
            <AlertIcon />
            {error}
          </Alert>
        )}
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
                <Box p="3" textAlign="left">
                  {tweet.tweet}
                </Box>
              </Card>
            ))}
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
