"use client";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

export default function SocialMedia({
  icon,
  title,
  description,
  button,
  ...rest
}) {
  return (
    <Box maxW={"270px"} w={"full"} boxShadow={"2xl"} rounded={"md"}>
      <Flex justify={"center"}>
        <Box
          width={16}
          height={16}
          sx={{
            border: "1px solid",
            borderRadius: "50%",
          }}
        >
          <Icon
            m="4"
            fontSize="32"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        </Box>
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {title}
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
        </Stack>

        {button}
      </Box>
    </Box>
  );
}
