"use client";

import * as yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Post from "components/post";
import userApi from "api/user";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PostModal from "components/postModal";

const formSchema = yup.object().shape({
  postContent: yup
    .string()
    .required("Please enter your post content.")
    .min(5, "At least 5 characters."),
});

export default function Home() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState(null);
  const [favoritePosts, setFavoritePosts] = useState(null);
  const postForm = useForm({
    resolver: yupResolver(formSchema),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = postForm;

  const getPosts = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getPostFacebook(localPhone);
    setPosts(res.data);
  };

  const getFavoritePosts = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getFavoritePosts(localPhone);
    setFavoritePosts(res.data);
  };

  const fetchApi = async () => {
    try {
      await getPosts();
      await getFavoritePosts();
    } catch (err) {
      console.log("error", err);
      // if (err.message) {
      //   toast({
      //     title: `Error: ${err.message}`,
      //     status: "error",
      //     position: "top-right",
      //     isClosable: true,
      //     duration: 1000,
      //   });
      // }
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const createPostFacebook = async (postContent) => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.createPostFacebook({
        phoneNumber: localPhone,
        message: postContent ?? "Hello world!",
      });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Create Facebook post successfully!",
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

  const createScheduledPostFacebook = async (postContent, scheduledTime) => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const reqScheduledTime = new Date(scheduledTime) ?? new Date();

      reqScheduledTime.setMinutes(reqScheduledTime.getMinutes() + 15);

      const res = await userApi.createScheduledPostFacebook({
        phoneNumber: localPhone,
        message: postContent ?? "Hello world with schedule!",
        scheduledTime: Math.floor(reqScheduledTime.getTime() / 1000),
      });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Create Facebook post successfully!",
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

  const likeSocialPost = async (postId) => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.likeSocialPost({
        phoneNumber: localPhone,
        postId: postId,
      });

      if (res.success === true) {
        fetchApi();
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

  const onSubmit = async (form) => {
    try {
      const { isScheduled, postContent, scheduledTime } = form;
      if (isScheduled) {
        await createScheduledPostFacebook(postContent, scheduledTime);
      } else {
        await createPostFacebook(postContent);
      }
    } catch (error) {
      toast({
        title: "Error!",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 1000,
      });
      console.log("error", error);
    } finally {
      reset({ postContent: "" });
      onClose();
    }
  };

  return (
    <Box ml={{ base: 0, md: 60 }}>
      <Box bg={"white"} mb={12}>
        <FormProvider {...postForm}>
          <FormControl>
            <Flex
              h={16}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={8}
            >
              <Box>All Posts</Box>
              <PostModal
                isOpen={isOpen}
                onClose={onClose}
                register={register}
                errors={errors}
                primaryButtonClick={handleSubmit(onSubmit)}
              >
                <Button
                  w={36}
                  bg={"#151f21"}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  onClick={onOpen}
                >
                  Create new post
                </Button>
              </PostModal>
            </Flex>
          </FormControl>
        </FormProvider>
      </Box>
      {/* Content */}
      <Grid
        templateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {posts &&
          posts.map((post) => {
            const isLiked = favoritePosts?.find((e) => e === post.id) != null;

            return (
              <GridItem key={post.id}>
                <Post
                  post={post}
                  isLiked={isLiked}
                  onHandleLikePost={likeSocialPost}
                />
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
}
