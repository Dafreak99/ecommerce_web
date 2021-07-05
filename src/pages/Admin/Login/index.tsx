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
import { Redirect } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import Axios from "../../../helpers/axios";
import { useAuth } from "../../../contexts/authContext";

interface Props {}

interface FormValues {
  email: string;
  password: string;
}
const AdminLogin: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [error] = useState<boolean>(false);
  const toast = useToast();

  const { setAdminToken, isAdminLoggedIn } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await Axios.post("/api/v1/admin/login", data);

      setAdminToken(res.data.token);
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

  if (isAdminLoggedIn()) {
    return <Redirect to="/admin/product" />;
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
        w="xl"
        bg="#fff"
        boxShadow="0 10px 30px rgba(0,0,0,.1)"
        p="3rem 5rem"
      >
        <Heading mb="2rem" textAlign="center">
          Admin Login
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
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLogin;
