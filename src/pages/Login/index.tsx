import React, { useState } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  Heading,
  Input,
  Flex,
  Button,
  Text,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import Axios from "../../helpers/axios";

interface Props {}

export interface LoginFormValues {
  email: string;
  password: string;
}
const Login: React.FC<Props> = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { isLoggedIn, setToken } = useAuth();
  const toast = useToast();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await Axios.post("/api/v2/public/auth/login", data);
      setToken(res.data);

      toast({
        title: "Success.",
        status: "success",
        description: "Succesfully login",
        duration: 2000,
        position: "top-right",
      });

      setToken(res.data.token);
    } catch (error) {
      toast({
        title: "Error.",
        description: error.response.data.message[0].msg,
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  if (isLoggedIn()) {
    const prevUrl = history.location.state as string;

    return <Redirect to={prevUrl ? prevUrl : "/"} />;
  }

  return (
    <Flex
      h="100vh"
      w="100vw"
      justify="center"
      alignItems="center"
      bg="primary"
      flexDirection="column"
    >
      <Flex alignItems="center" mb="2rem">
        <Icon as={SiShopware} boxSize="3rem" color="gray.100" mr="1rem" />
        <Heading color="gray.100">Ecommerce</Heading>
      </Flex>
      <Box
        w={{ base: "sm", md: "xl" }}
        bg="#fff"
        boxShadow="0 10px 30px rgba(0,0,0,.1)"
        p="3rem 5rem"
      >
        <Heading mb="2rem" textAlign="center">
          Login Page
        </Heading>

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Email</FormLabel>

            <Input type="email" {...register("email", { required: true })} />
            {errors.email?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>

            <Input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Password is required
              </Text>
            )}
          </FormControl>

          <FormControl mt="2rem">
            <Button w="100%" colorScheme="teal" type="submit">
              Login
            </Button>
          </FormControl>

          <Text textAlign="center" mt="2rem" fontStyle="italic">
            Doesn't have an account yet ?{" "}
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
