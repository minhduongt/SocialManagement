import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  Alert,
  AlertIcon,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "api/user";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const authSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Please enter your phone number")
    .matches(phoneRegExp, "Please enter correct phone number format"),
});

function Authenticate() {
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(1);
  const authenForm = useForm({
    resolver: yupResolver(authSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = authenForm;

  const LoginWithPhone = async (form) => {
    try {
      const phoneNumber = form.phoneNumber;

      const requestData = { phoneNumber: phoneNumber };
      const res = await userApi.auth(requestData);

      if (res.success) {
        setStep(2);
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
    }
  };

  const validateOTP = async (form) => {
    try {
      const phoneNumber = form.phoneNumber;
      const requestData = { phoneNumber: phoneNumber, accessCode: otp };
      const res = await userApi.validateOTP(requestData);
      if (res.success === true) {
        toast({
          title: "Sign in successfully!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
        localStorage.setItem("phoneNumber", phoneNumber);
        navigate("/");
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
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Welcome to Social Management ✌️</Heading>
          <Flex flexDirection={"row"}>
            {/* <Text fontSize={"xl"} color={"gray.600"}>

            
            </Text> */}
          </Flex>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormProvider {...authenForm}>
              <FormControl>
                {step === 1 && (
                  <>
                    <FormLabel>Phone number</FormLabel>
                    <Input
                      sx={{ mt: 4 }}
                      placeholder="Ex: 84939456738"
                      {...register("phoneNumber")}
                    />

                    {errors.phoneNumber && (
                      <Alert
                        status="error"
                        sx={{ maxH: "2em", marginY: "1em" }}
                      >
                        <AlertIcon />
                        <Text fontSize="md">{errors.phoneNumber.message}</Text>
                      </Alert>
                    )}
                    <Stack sx={{ my: 4 }} spacing={10}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleSubmit(LoginWithPhone)}
                      >
                        Next
                      </Button>
                    </Stack>
                  </>
                )}
                {step === 2 && (
                  <Stack>
                    <FormLabel>Enter your OTP</FormLabel>
                    {/* <Input {...register("otp")} /> */}
                    <Stack
                      direction={"row"}
                      width={"20rem"}
                      alignSelf={"center"}
                    >
                      <PinInput
                        sx={{ justifyContent: "center" }}
                        onChange={(value) => setOtp(value)}
                      >
                        {[...Array(6)].map((_, i) => (
                          <PinInputField sx={{ mx: 2 }} key={i} />
                        ))}
                      </PinInput>
                    </Stack>

                    {/* {errors.otp && (
                    <Alert
                      status="error"
                      sx={{ maxH: "2em", marginY: "1em" }}
                    >
                      <AlertIcon />
                      <Text fontSize="md">{errors.otp.message}</Text>
                    </Alert>
                  )} */}
                    <Stack sx={{ mt: 8 }} spacing={10}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleSubmit(validateOTP)}
                      >
                        Confirm
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </FormControl>
            </FormProvider>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Authenticate;
