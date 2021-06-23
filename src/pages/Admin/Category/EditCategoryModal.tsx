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
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AiFillEdit } from "react-icons/ai";
import {
  categorySelectors,
  editCategory,
} from "../../../features/categories/categoriesSlice";
import { RootState } from "../../../app/store";

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
