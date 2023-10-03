import React, { Component, useEffect, useState } from "react";
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

const phoneRegExp = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
const authenSchema1 = yup.object().shape({
  phone: yup
    .string()
    .required("Hãy điền vào Số Điện Thoại")
    .matches(phoneRegExp, "Hãy đúng dạng Số Điện Thoại"),
});
const authenSchema2 = yup.object().shape({
  otp: yup.string().required("Hãy điền vào OTP"),
});

function Authenticate() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const authenForm = useForm({
    resolver:
      step === 1 ? yupResolver(authenSchema1) : yupResolver(authenSchema2),
  });

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = authenForm;

  const LoginWithPhone = async (form) => {
    if (typeof window !== "undefined") {
      try {
        const phoneNumber = form.phoneNumber;
        const res = await userApi.auth(phoneNumber);
        if (res) {
          console.log("res", res);
          setStep(2);
        }
      } catch (error) {
        toast({
          title: "Có lỗi xảy ra",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
        console.log("error", error);
      }
    } else {
      const phoneNumber = form.phone.replace("0", "+84");
      console.log("phoneNumber", phoneNumber);
      setStep(2);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Welcome to Social Management ✌️</Heading>
          <Flex flexDirection={"row"}>
            {/* <Text fontSize={"xl"} color={"gray.600"}>
              Đặt món cùng nhau dễ dàng hơn 
            
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
                      placeholder="Ex: +84939456738"
                      {...register("phone")}
                    />
                    {/* <Spacer></Spacer> */}

                    {errors.phone && (
                      <Alert
                        status="error"
                        sx={{ maxH: "2em", marginY: "1em" }}
                      >
                        <AlertIcon />
                        <Text fontSize="md">{errors.phone.message}</Text>
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
                        onClick={() => {}}
                      >
                        Xác nhận
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </FormControl>
            </FormProvider>
          </Stack>
          <div id="captchaContainer" />
        </Box>
        {/* <Flex sx={{ fontSize: "1em", justifyContent: "center" }}>
        Hoặc bạn có thể:
      </Flex>
      <Button
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={LoginWithGoogle}
      >
        <Flex gap={2} sx={{ alignItems: "center" }}>
          <FcGoogle />
          <Text>Đăng nhập với Google</Text>
        </Flex>
      </Button> */}
      </Stack>
    </Flex>
  );
}

export default Authenticate;
