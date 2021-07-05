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
import { useAuth } from "../../contexts/authContext";
import Axios from "../../helpers/axios";

interface Props {}

export interface RegisterFormValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  confirmPassword: string;
}
const Register: React.FC<Props> = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const { isLoggedIn } = useAuth();
  const toast = useToast();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const res = await Axios.post("/api/v2/public/auth/register", data);
      toast({
        title: "Success.",
        status: "success",
        description: res.data.msg,
        duration: 2000,
        position: "top-right",
      });

      setTimeout(() => {
        history.push("/login");
      }, 2000);
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
      <Box bg="#fff" boxShadow="0 10px 30px rgba(0,0,0,.1)" p="3rem 5rem">
        <Heading mb="2rem" textAlign="center">
          Register
        </Heading>

        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
          w="max-content"
          gridColumnGap="1rem"
        >
          <FormControl gridColumn="span 2">
            <FormLabel>Email</FormLabel>

            <Input type="email" {...register("email", { required: true })} />
            {errors.email?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>

          <FormControl gridColumn="span 2">
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

          <FormControl gridColumn="span 2">
            <FormLabel>Confirm Password</FormLabel>

            <Input
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Password is required
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>First name</FormLabel>

            <Input
              type="text"
              {...register("first_name", { required: true })}
            />
            {errors.first_name?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Last name</FormLabel>

            <Input type="text" {...register("last_name", { required: true })} />
            {errors.last_name?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>

            <Input type="text" {...register("address", { required: true })} />
            {errors.address?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>

            <Input type="text" {...register("phone", { required: true })} />
            {errors.phone?.type === "required" && (
              <Text color="red.600" fontStyle="italic" mt="5px">
                Username is required
              </Text>
            )}
          </FormControl>

          <FormControl mt="2rem" gridColumn="span 2">
            <Button w="100%" colorScheme="teal" type="submit">
              Sign In
            </Button>
          </FormControl>

          <Text
            textAlign="center"
            mt="2rem"
            fontStyle="italic"
            gridColumn="span 2"
          >
            Already have an account ?{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
