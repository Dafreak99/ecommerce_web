import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  categorySelectors,
  editCategory,
} from "../../../features/categories/categoriesSlice";

interface Props {
  id: string;
}

type FormValues = {
  name: string;
};

const EditCategoryModal: React.FC<Props> = ({ id }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const category = useAppSelector((state) =>
    categorySelectors.selectById(state, id)
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(editCategory({ id, newObj: data }));
    reset();
    onClose();
  };

  return (
    <>
      <Icon as={AiFillEdit} cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  defaultValue={category?.name}
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
    </>
  );
};

export default EditCategoryModal;
