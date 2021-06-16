import React from "react";

import {
  Box,
  Icon,
  Button,
  Input,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
  Textarea,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Text,
  Select,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { getCategories } from "../../../features/categories/categoriesSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { createProduct } from "../../../features/products/productSlice";
import { useHistory } from "react-router-dom";

type FormValues = {
  title: string;
  description: string;
  sku: string;
  image: string;
  video: string;
  images: [string];
  videos: [string];
  price: number;
  quantity: number;
  category: [string];
  cat: string;
  promotion: string | null;
  specifications: any;
  status: string;
};

interface Props {}

const AddProduct: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { categories, status } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.images = [data.image];
    data.videos = [data.video];
    data.category = [data.cat];

    data.specifications = cleanSpecs(data.specifications);

    dispatch(createProduct(data));

    history.goBack();
  };

  const cleanSpecs = (specs: string) => {
    let attributes = specs.split("\n");
    let specifications: any = {};

    for (let attribute of attributes) {
      let property = attribute.split(":");
      specifications[property[0]] = property[1];
    }
    return specifications;
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Add Product</Heading>
        <Button
          type="submit"
          textTransform="uppercase"
          bg="primary"
          color="#fff"
        >
          <Icon as={AiOutlineCheck} mr="0.5rem" /> Save
        </Button>
      </Flex>
      <Box
        p="3rem"
        bg="#fff"
        boxShadow="0 4px 4px rgba(0,0,0,.05)"
        display="grid"
        gridTemplateColumns="repeat(2,1fr)"
        gridGap="2rem"
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
            <Input placeholder="Sku" {...register("sku", { required: true })} />
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
                name="cat"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select placeholder="Select option" {...field}>
                    {categories.map(({ name, _id }) => (
                      <option value={_id} key={_id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                )}
              />
            )}
            {errors.cat?.type === "required" && (
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
              {...register("image", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Video</FormLabel>
            <Input
              placeholder="Video link"
              {...register("video", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              {...register("description", { required: true })}
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
      </Box>
    </Box>
  );
};

export default AddProduct;
