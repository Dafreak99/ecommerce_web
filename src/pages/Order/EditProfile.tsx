import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Icon,
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
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../features/profile/profileSlice";
import { Profile } from "../../types";

interface Props {
  profile: Profile;
}

export interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
}

const EditProfile: React.FC<Props> = ({ profile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const { updateStatus } = useAppSelector((state) => state.profile);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(updateProfile(data));
    onClose();
  };
  return (
    <>
      <Icon
        as={AiFillEdit}
        cursor="pointer"
        onClick={onOpen}
        fontSize="1.5rem"
        position="absolute"
        top="5%"
        right="5%"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            gridColumnGap="2rem"
          >
            <FormControl gridColumn="span 2">
              <FormLabel>Email</FormLabel>
              <Input
                defaultValue={profile.email}
                {...register("email", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                defaultValue={profile.first_name}
                {...register("first_name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input
                defaultValue={profile.last_name}
                {...register("last_name", { required: true })}
              />
            </FormControl>
            <FormControl gridColumn="span 2">
              <FormLabel>Address</FormLabel>
              <Input
                defaultValue={profile.address}
                {...register("address", { required: true })}
              />
            </FormControl>
            <FormControl gridColumn="span 2">
              <FormLabel>Phone</FormLabel>
              <Input
                defaultValue={profile.phone}
                {...register("phone", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              disabled={updateStatus === "pending"}
            >
              {updateStatus === "pending" && <Spinner mr="10px" size="sm" />}{" "}
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
