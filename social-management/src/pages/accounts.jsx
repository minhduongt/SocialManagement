"use client";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import SocialMedia from "components/socialMedia";
import { FiFacebook, FiX, FiInstagram } from "react-icons/fi";
import userApi from "api/user";

export default function Accounts() {
  const toast = useToast();
  const [fbToken, setFbToken] = useState("");
  const [xToken, setXToken] = useState("");
  const [user, setUser] = useState(null);

  const fetchApi = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getUser({ phoneNumber: localPhone });
    setUser(res.data);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  useEffect(() => {
    if (user) {
      const { facebookAccessToken, twitterAccessToken } = user;
      setFbToken(facebookAccessToken);
      setXToken(twitterAccessToken);
    }
  }, [user]);

  const loginWithFacebook = async (response) => {
    try {
      if (response) {
        console.log("fb response", response);
        const { accessToken, userID } = response;
        const localPhone = localStorage.getItem("phoneNumber");
        const res = await userApi.fbLogin({
          accessToken: accessToken,
          userId: userID,
          phoneNumber: localPhone,
        });

        if (res.success === true) {
          fetchApi();
          toast({
            title: "Sign in Facebook successfully!",
            status: "success",
            position: "top-right",
            isClosable: true,
            duration: 1000,
          });
        }
      }
    } catch (err) {
      console.log("error", err);
      if (err.message) {
        toast({
          title: `Error: ${err.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    }
  };
  const signOutFacebook = async () => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.fbLogout({
        phoneNumber: localPhone,
      });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Sign out Facebook successfully!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (err) {
      console.log("error", err);
      if (err?.message) {
        toast({
          title: `Error: ${err?.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    }
  };

  const loginWithInstagram = () => {
    console.log("Instagram");
  };

  const loginWithX = async () => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.twitterLogin({ phoneNumber: localPhone });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Login in with twitter successfully!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (err) {
      console.log("error", err);
      if (err?.message) {
        toast({
          title: `Error: ${err?.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    }
  };

  const logoutWithX = async () => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.twitterLogout({ phoneNumber: localPhone });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Login out twitter successfully!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (err) {
      console.log("error", err);
      if (err?.message) {
        toast({
          title: `Error: ${err?.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    }
  };

  const socialMedias = [
    {
      title: "Facebook",
      description: "",
      icon: FiFacebook,
      button:
        fbToken === "" ? (
          <FacebookLogin
            appId="335851842285898"
            fields="name,email,picture"
            scope="pages_show_list"
            callback={loginWithFacebook}
            render={(renderProps) => (
              <Button
                isDisabled={user != null ? false : true}
                w={"full"}
                mt={8}
                bg={"#151f21"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={renderProps.onClick}
              >
                {user != null ? "Sign in" : "Loading..."}
              </Button>
            )}
          />
        ) : (
          <Button
            w={"full"}
            mt={8}
            bg={"#151f21"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={signOutFacebook}
          >
            Sign out
          </Button>
        ),
    },
    {
      title: "Instagram",
      description: "",
      icon: FiInstagram,
      button: (
        <Button
          isDisabled={user != null ? false : true}
          w={"full"}
          mt={8}
          bg={"#151f21"}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          onClick={() => {}}
        >
          {user != null ? "Sign in" : "Loading..."}
        </Button>
      ),
    },
    {
      title: "X (Twitter)",
      description: "",
      icon: FiX,
      button:
        xToken === "" ? (
          <Button
            isDisabled={user != null ? false : true}
            w={"full"}
            mt={8}
            bg={"#151f21"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={loginWithX}
          >
            {user != null ? "Sign in" : "Loading..."}
          </Button>
        ) : (
          <Button
            isDisabled={user != null ? false : true}
            w={"full"}
            mt={8}
            bg={"#151f21"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={logoutWithX}
          >
            {user != null ? "Sign out" : "Loading..."}
          </Button>
        ),
    },
  ];

  return (
    <Box ml={{ base: 0, md: 60 }}>
      <Box bg={"white"} mb={12}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={8}
        >
          <Box>
            <Text fontSize={24} fontWeight={"semibold"}>
              Accounts{}
            </Text>
          </Box>
        </Flex>
      </Box>
      {/* Content */}

      <Flex
        gap={12}
        justifyContent={"flex-start"}
        alignItems={"center"}
        ml={{ base: 0, md: 12 }}
      >
        {socialMedias.map((media) => {
          return (
            <SocialMedia
              key={media.title}
              icon={media.icon}
              title={media.title}
              description={media.description}
              button={media.button}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
