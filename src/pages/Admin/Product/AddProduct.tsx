import React, { useState } from "react";

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
  NumberInput,
  NumberInputField,
  Text,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import {
  categorySelectors,
  getCategories,
} from "../../../features/categories/categoriesSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { createProduct } from "../../../features/products/productSlice";
import { useHistory } from "react-router-dom";
import UploadPreview from "../../../components/UploadPreview";
import BackButton from "../../../components/BackButton";
import uploadImage from "../../../helpers/uploadImage";
import {
  getPromotionsByStatus,
  promotionSelector,
} from "../../../features/promotions/promotionSlice";

type FormValues = {
  title: string;
  desciption: string;
  sku: string;
  image: string;
  video: string;
  images: string[];
  videos: string[];
  price: number;
  quantity: number;
  category: [string];
  cat: string;
  promotion: string | number | readonly string[] | undefined;
  specifications: any;
  status: string;
};

interface Props {}

const AddProduct: React.FC<Props> = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [isSave, setIsSave] = useState<boolean>(false);

  const categories = useAppSelector(categorySelectors.selectAll);
  const promotions = useAppSelector(promotionSelector.selectAll);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPromotionsByStatus(true));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSave(true);
    data.images = await uploadImage(files, fileUrls);

    data.videos = [data.video];
    data.category = [data.cat];
    data.specifications = cleanSpecs(data.specifications);

    const resultAction = await dispatch(createProduct(data));

    if (createProduct.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: (resultAction.payload as any).error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsSave(false);
    } else {
      history.goBack();
    }
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
        <BackButton heading="Add Product" />
        <Button
          type="submit"
          textTransform="uppercase"
          bg="primary"
          color="#fff"
          disabled={isSave}
        >
          {isSave ? (
            <Spinner size="xs" mr="0.5rem" />
          ) : (
            <Icon as={AiOutlineCheck} mr="0.5rem" />
          )}
          Save
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
                  <Select placeholder="Select category" {...field}>
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
          <FormControl>
            <FormLabel>Promotion</FormLabel>
            {promotions.length > 0 && (
              <Controller
                name="promotion"
                control={control}
                render={({ field }) => (
                  <Select placeholder="Select promotion" {...field}>
                    {promotions.map(({ _id, title, value }) => (
                      <option value={_id} key={_id}>
                        {title} ({value}%)
                      </option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>
        </Box>

        {/* Right Column */}

        <Box>
          <FormControl>
            <FormLabel>Image</FormLabel>

            <UploadPreview
              files={files}
              setFiles={setFiles}
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
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
      </Box>
    </Box>
  );
};

export default AddProduct;
