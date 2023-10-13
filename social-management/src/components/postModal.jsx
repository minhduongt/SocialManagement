import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function PostModal({
  children,
  isOpen,
  onClose,
  register,
  errors,
  primaryButtonClick,
  currentUser,
}) {
  const [isScheduled, setIsSheduled] = useState(false);

  return (
    <>
      <Box>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={5}>
              <Box>
                <Stack>
                  <Flex gap={2} justifyContent={"space-between"}>
                    <Text pb={2} fontSize={18} fontWeight={"semibold"}>
                      Facebook Post (
                      {currentUser?.facebookAccessToken === ""
                        ? "Not accessed"
                        : "Accessed"}
                      )
                    </Text>
                    <Switch
                      {...register("isFbChecked")}
                      isDisabled={
                        currentUser?.facebookAccessToken === "" ? true : false
                      }
                    />
                  </Flex>
                  <Flex gap={2} justifyContent={"space-between"}>
                    <Text pb={2} fontSize={18} fontWeight={"semibold"}>
                      X (Twitter) Post (
                      {currentUser?.twitterAccessToken === ""
                        ? "Not accessed"
                        : "Accessed"}
                      )
                    </Text>
                    <Switch
                      {...register("isXChecked")}
                      isDisabled={
                        currentUser?.twitterAccessToken === "" ? true : false
                      }
                    />
                  </Flex>
                </Stack>
                <Flex
                  py={2}
                  gap={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  height={10}
                >
                  <Flex gap={2} minWidth={"50%"}>
                    <Text>Schedule post:</Text>
                    <Switch
                      {...register("isScheduled")}
                      value={isScheduled}
                      onChange={(e) => {
                        setIsSheduled(e.target.checked);
                      }}
                    />
                  </Flex>

                  {isScheduled && (
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      {...register("scheduledTime")}
                    />
                  )}
                </Flex>
                {isScheduled && (
                  <Text color={"gray.400"} fontSize={14}>
                    Schedule time must be between 10 minutes and 30 days
                  </Text>
                )}
                <Input
                  sx={{ my: 4 }}
                  placeholder="Your content..."
                  {...register("postContent")}
                />

                <Flex justifyContent={"flex-end"}>
                  <Button
                    colorScheme="blue"
                    onClick={async () => {
                      await primaryButtonClick();
                    }}
                  >
                    Create post
                  </Button>
                </Flex>
              </Box>
              <Divider sx={{ borderColor: "black" }} />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex
              gap={5}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {errors.postContent && (
                <Alert status="warning" sx={{ maxH: "2em", marginY: "1em" }}>
                  <Text fontSize="md">{errors.postContent.message}</Text>
                </Alert>
              )}
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostModal;
