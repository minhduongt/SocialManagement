"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Image,
} from "@chakra-ui/react";
import {
  BsArrowUpRight,
  BsHeartFill,
  BsHeart,
  BsFillChatRightTextFill,
  BsShare,
} from "react-icons/bs";

export default function Post({ post, isLiked, onHandleLikePost, ...rest }) {
  const [liked, setLiked] = useState(false);
  const { id, message, created_time } = post;

  useEffect(() => {
    if (isLiked) {
      setLiked(true);
    }
  }, [isLiked]);

  return (
    <Box
      w="xs"
      rounded={"sm"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
      borderColor="black"
      boxShadow={useColorModeValue("2px 4px 0 black")}
    >
      <HStack margin="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/386137700_122103136202064495_5115652755850777739_n.png?_nc_cat=102&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=cR5k1x1W5LoAX8CNSkj&_nc_oc=AQnWEYu-7O2QgyLWya0YGWx4mswjQcbrRvYZ_c68qWFx8pnPXoAeBx2JDVINGE7yLEE&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBGZpBKAjytiOZC-k5SBcU9hGPD8OTais4oiA1XkGt-Kw&oe=6523980E"
          alt={`Avatar`}
        />
        <Text fontWeight="medium">Social Management</Text>
        {/* <Text>—</Text> */}
        {/* <Text>{created_time}</Text> */}
      </HStack>
      {/* <Box h={"200px"} borderBottom={"1px"} borderColor="black">
        <Img
          src={
            "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          roundedTop={"sm"}
          objectFit="cover"
          h="full"
          w="full"
          alt={"Blog Image"}
        />
      </Box> */}
      <Box p={4}>
        {/* <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
         Title
          </Heading> */}
        <Text color={"gray.500"} noOfLines={2}>
          {message}
        </Text>
      </Box>
      <HStack borderTop={"1px"} color="black">
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          w="full"
        >
          <BsFillChatRightTextFill fontSize={"24px"} />
        </Flex>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor="pointer"
        >
          <BsShare fontSize={"24px"} />
        </Flex>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          borderLeft={"1px"}
          cursor="pointer"
          onClick={() => {
            setLiked(!liked);
            onHandleLikePost(id);
          }}
        >
          {liked ? (
            <BsHeartFill fill="red" fontSize={"24px"} />
          ) : (
            <BsHeart fontSize={"24px"} />
          )}
        </Flex>
      </HStack>
    </Box>
  );
}
