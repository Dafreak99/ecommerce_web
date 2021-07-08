import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import Axios from "../../helpers/axios";

interface Props {}

export interface FormValues {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

const ChangePasswordModal: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await Axios.put(
        "/api/v2/public/auth/profile/change-password",
        data
      );
      toast({
        status: "success",
        title: "Success",
        description: res.data.msg,
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setIsLoading(false);
      reset();
      onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: error.response.data.message[0].msg,
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        leftIcon={<RiLockPasswordFill />}
        mt="2rem"
        w="100%"
        bg="#fff"
        color="primary"
        onClick={onOpen}
      >
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter old password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                {...register("new_password", { required: true })}
                placeholder="Enter new password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                {...register("confirm_new_password", { required: true })}
                placeholder="Confirm new password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner mr="10px" size="sm" />} Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
