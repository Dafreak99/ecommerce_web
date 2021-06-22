import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { createCategory } from "../../../features/categories/categoriesSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  name: string;
};

const AddCategoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(createCategory(data));
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Enter new category"
                {...register("name", { required: true })}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
