/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../contexts/authContext";
import {
  createComment,
  getComments,
} from "../../features/comments/commentSlice";

interface Props {}

interface FormValues {
  content: string;
}

const Comment: React.FC<Props> = () => {
  const toast = useToast();
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit } = useForm<FormValues>();
  const [star, setStar] = useState<number>(3);
  const comments = useAppSelector((state) => state.comments.comments);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    dispatch(getComments(params.id));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const resultAction = await dispatch(
      createComment({
        product_id: params.id,
        content: data.content,
        rate: star,
      })
    );

    if (createComment.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: (resultAction.payload as any).error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      reset();
      dispatch(getComments(params.id));
    }
  };

  return (
    <Box borderBottom="1px solid #f3f3f3">
      <Box className="container" p="5rem 0">
        <Heading fontSize="large" mb="2rem">
          Customer Reviews
        </Heading>

        {isLoggedIn() ? (
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection={{ base: "column", lg: "row" }}>
              <StarRatingComponent
                name="rate"
                starCount={5}
                value={star}
                emptyStarColor="#f3f3f3"
                onStarClick={setStar}
              />
              <Textarea
                w={{ base: "100%", lg: "sm" }}
                ml={{ base: 0, lg: "2rem" }}
                mr={{ base: 0, lg: "1rem" }}
                mb={{ base: "1rem", lg: 0 }}
                placeholder="Leave a comment on this product"
                {...register("content", { required: true })}
              ></Textarea>
              <Button type="submit">Save</Button>
            </Flex>
          </Box>
        ) : (
          <Alert status="info" w="max-content">
            <AlertIcon />
            Please login to review this product.
            <Link
              to="/login"
              style={{ textDecoration: "underline", marginLeft: "5px" }}
            >
              Login Page
            </Link>
          </Alert>
        )}

        {comments?.length > 0 ? (
          <>
            {comments.map(({ content, user_id, rate, createdAt }, i) => (
              <Flex key={i} mt="4rem">
                <Box boxSize="6rem" borderRadius="50%" bg="#f3f3f3" mr="2rem" />
                <Box>
                  <Text fontWeight="semibold" mb="5px">
                    User: {user_id}
                  </Text>
                  <Flex alignItems="center">
                    <StarRatingComponent
                      name="rate"
                      value={rate}
                      emptyStarColor="#f3f3f3"
                    />
                    <Box ml="1rem" fontSize="md" fontStyle="italic">
                      {format(new Date(createdAt), "dd-MM-yyyy")}
                    </Box>
                  </Flex>
                  <Text>{content}</Text>
                </Box>
              </Flex>
            ))}
          </>
        ) : (
          <Text mt="2rem">There is no review for this item yet</Text>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
