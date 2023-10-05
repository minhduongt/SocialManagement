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
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Post from "components/post";
import userApi from "api/user";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PostModal from "components/postModal";
import { BsSearch } from "react-icons/bs";

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
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [favoritePosts, setFavoritePosts] = useState(null);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const postForm = useForm({
    resolver: yupResolver(formSchema),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = postForm;

  const getUser = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getUser({ phoneNumber: localPhone });
    setUser(res.data);
  };

  const getFbPosts = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getPostFacebook(localPhone);
    setPosts(res.data);
  };
  const getXPosts = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getPostTwitter(localPhone);
    setPosts(res.data);
  };

  const getFavoritePosts = async () => {
    const localPhone = localStorage.getItem("phoneNumber");
    const res = await userApi.getFavoritePosts(localPhone);
    setFavoritePosts(res.data);
  };

  const fetchApi = async () => {
    try {
      await getUser();
      await getFbPosts();
      await getXPosts();
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPost();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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

      reqScheduledTime.setMinutes(reqScheduledTime.getMinutes());

      const res = await userApi.createScheduledPostFacebook({
        phoneNumber: localPhone,
        message: postContent ?? "Hello world with schedule!",
        scheduledTime: Math.floor(reqScheduledTime.getTime() / 1000),
      });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Create scheduled Facebook post successfully!",
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

  const createPostTwitter = async (postContent) => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const res = await userApi.createPostTwitter({
        phoneNumber: localPhone,
        message: postContent ?? "Hello world!",
      });

      if (res.success === true) {
        fetchApi();
        toast({
          title: "Create Twitter post successfully!",
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

  const createScheduledPostTwitter = async (postContent, scheduledTime) => {
    try {
      const localPhone = localStorage.getItem("phoneNumber");
      const reqScheduledTime = new Date(scheduledTime) ?? new Date();

      reqScheduledTime.setMinutes(reqScheduledTime.getMinutes());

      const res = await userApi.createScheduledPostTwitter({
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
      console.log("form", form);
      const {
        isScheduled,
        postContent,
        scheduledTime,
        isFbChecked,
        isXChecked,
      } = form;
      if (isFbChecked === true) {
        if (isScheduled) {
          await createScheduledPostFacebook(postContent, scheduledTime);
        } else {
          await createPostFacebook(postContent);
        }
      }

      if (isXChecked === true) {
        await createPostTwitter(postContent);
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
      reset({ postContent: "", isFbChecked: false, isXChecked: false });
      onClose();
    }
  };

  const searchPost = () => {
    if (search !== "") {
      let newFilteredPosts = [];
      if (search.includes("fav") || search.includes("favorite")) {
        favoritePosts?.map((e) => {
          const favPost = posts.find((post) => post.id === e);
          if (favPost != null) {
            newFilteredPosts.push(favPost);
          }
        });
      }
      posts?.map((post) => {
        if (newFilteredPosts.length > 0) {
          if (
            newFilteredPosts.findIndex(
              (filteredPost) => post.id === filteredPost.id
            ) < 0
          ) {
            if (post.message.includes(search)) {
              newFilteredPosts.push(post);
            }
          }
        } else if (post.message.toLowerCase().includes(search.toLowerCase())) {
          newFilteredPosts.push(post);
        }
      });

      setFilteredPosts(newFilteredPosts);
    }
  };

  return (
    <Box ml={{ base: 0, md: 60 }}>
      <Box bg={"white"} mb={6}>
        <FormProvider {...postForm}>
          <FormControl>
            <Flex
              h={16}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={8}
            >
              <Box>
                <Text fontSize={24} fontWeight={"semibold"}>
                  All Posts
                </Text>
              </Box>
              <PostModal
                isOpen={isOpen}
                onClose={onClose}
                register={register}
                errors={errors}
                primaryButtonClick={handleSubmit(onSubmit)}
                currentUser={user}
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
                  isDisabled={
                    user?.facebookAccessToken === "" && user?.twitterAccessToken
                      ? true
                      : false
                  }
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
      {posts && (
        <Flex pb={6} justifyContent={"center"}>
          <InputGroup sx={{ width: "40%" }}>
            <InputLeftElement pointerEvents="none">
              <BsSearch color="gray.300" />
            </InputLeftElement>
            <Input
              sx={{ border: "2px solid black" }}
              placeholder="Search here... (ex: favorite, post content...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
      )}

      <Grid
        templateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {user?.facebookAccessToken === "" ? (
          <Flex justifyContent={"center"}>
            <Text>Connect to your social account to view posts.</Text>
          </Flex>
        ) : search !== "" ? (
          filteredPosts && filteredPosts.length > 0 ? (
            filteredPosts?.map((post) => {
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
            })
          ) : (
            <Flex justifyContent={"center"}>
              <Text>Not found.</Text>
            </Flex>
          )
        ) : posts ? (
          posts?.map((post) => {
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
          })
        ) : (
          <Flex justifyContent={"center"}>
            <Text>There is no post right now.</Text>
          </Flex>
        )}
      </Grid>
    </Box>
  );
}
