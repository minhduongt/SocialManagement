import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
}) {
  const [isScheduled, setIsSheduled] = useState(false);

  return (
    <>
      <Box>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

            <Input
              sx={{ mt: 4 }}
              placeholder="Your content..."
              {...register("postContent")}
            />
            {errors.postContent && (
              <Alert status="warning" sx={{ maxH: "2em", marginY: "1em" }}>
                <Text fontSize="md">{errors.postContent.message}</Text>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                primaryButtonClick();
                setIsSheduled(false);
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostModal;
