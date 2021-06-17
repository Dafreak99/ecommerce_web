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
  Radio,
  RadioGroup,
  HStack,
  Textarea,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { getCategories } from "../../../features/categories/categoriesSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  title: string;
  desciption: string;
  sku: string;
  images: string[];
  videos: string[];
  price: number;
  quantity: number;
  category: string;
  promotion: string | null;
  specifications: string;
  status: string;
};

type Category = {
  name: string;
  _id: string;
};

const AddProductModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { categories, status } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridColumnGap="2rem"
        >
          {/* Left Column */}
          <Box>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Sku</FormLabel>
              <Input
                placeholder="Sku"
                {...register("sku", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Controller
                name="status"
                control={control}
                defaultValue="selling"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="24px">
                      <Radio value="selling">Selling</Radio>
                      <Radio value="pending">Pending</Radio>
                      <Radio value="empty">Empty</Radio>
                      <Radio value="sales">Sales</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              {categories.length > 0 && (
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <HStack spacing="24px">
                        {categories.map(({ name, _id }) => (
                          <Radio value={_id}>{name}</Radio>
                        ))}
                      </HStack>
                    </RadioGroup>
                  )}
                />
              )}
              {errors.category?.type === "required" && (
                <Text color="red.600" fontStyle="italic" mt="0.5rem">
                  Category is required
                </Text>
              )}
            </FormControl>
          </Box>

          {/* Right Column */}
          <Box>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Image link"
                {...register("images", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Video</FormLabel>
              <Input
                placeholder="Video link"
                {...register("videos", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                {...register("desciption", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Specification</FormLabel>
              <Textarea
                placeholder="Specifications"
                {...register("specifications", { required: true })}
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

export default AddProductModal;
