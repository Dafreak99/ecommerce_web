import React, { useEffect } from "react";

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
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AiOutlineCheck } from "react-icons/ai";
import {
  editProduct,
  productSelectors,
} from "../../../features/products/productSlice";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import { categorySelectors } from "../../../features/categories/categoriesSlice";
import BackButton from "../../../components/BackButton";
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
  images: [string];
  videos: [string];
  price: number;
  quantity: number;
  category: [string];
  cat: string;
  promotion: string | number | readonly string[] | undefined;
  specifications: any;
  status: string;
};

interface Props {}

const EditProduct: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const categories = useAppSelector(categorySelectors.selectAll);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, params.id)
  );
  const promotions = useAppSelector(promotionSelector.selectAll);

  useEffect(() => {
    dispatch(getPromotionsByStatus(true));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.images = [data.image];
    data.videos = [data.video];
    data.category = [data.cat];
    data.specifications = cleanSpecs(data.specifications);

    dispatch(editProduct({ id: params.id, newObj: data }));
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
        <BackButton heading="Edit Product" />
        <Button
          type="submit"
          textTransform="uppercase"
          bg="primary"
          color="#fff"
        >
          <Icon as={AiOutlineCheck} mr="0.5rem" /> Update
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
        {/* Left Column Start */}
        {product ? (
          <>
            <Box>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  defaultValue={product.title}
                  {...register("title", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput defaultValue={product.price}>
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
                  defaultValue={product.quantity}
                  placeholder="Quantity"
                  {...register("quantity", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sku</FormLabel>
                <Input
                  defaultValue={product.sku}
                  placeholder="Sku"
                  {...register("sku", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={product.status}
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
                    defaultValue={product.category[0]._id}
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

              <FormControl>
                <FormLabel>Promotion</FormLabel>
                {promotions.length > 0 && (
                  <Controller
                    name="promotion"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={
                      product.promotion ? product.promotion!._id : ""
                    }
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
                {errors.promotion?.type === "required" && (
                  <Text color="red.600" fontStyle="italic" mt="0.5rem">
                    Category is required
                  </Text>
                )}
              </FormControl>
            </Box>
            {/* Left Column End */}

            {/* Right Column Start */}
            <Box>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Image link"
                  defaultValue={product.images[0]}
                  {...register("image", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Video</FormLabel>
                <Input
                  placeholder="Video link"
                  defaultValue={product.videos[0]}
                  {...register("video", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  h="10rem"
                  placeholder="Description"
                  defaultValue={product.desciption}
                  {...register("desciption", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Specification</FormLabel>
                <Textarea
                  h="10rem"
                  placeholder="Specifications"
                  {...register("specifications", { required: true })}
                  defaultValue={Object.entries(product.specifications).map(
                    (spec) => `${spec[0]}` + ": " + `${spec[1]}`
                  )}
                />
              </FormControl>
            </Box>
            {/* Right Column End */}
          </>
        ) : (
          <Stack gridColumn="span 2">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default EditProduct;
