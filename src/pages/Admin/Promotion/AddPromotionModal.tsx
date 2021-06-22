import React, { useState } from "react";

import vi from "date-fns/locale/vi";

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
  NumberInputField,
  NumberInput,
  Grid,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DateRange } from "react-date-range";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { addDays, format } from "date-fns";
import { createPromotion } from "../../../features/promotions/promotionSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  title: string;
  desciption: string;
  value: number;
};

const AddPromotionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  // const error = useAppSelector((state) => state.promotions.error);
  const toast = useToast();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);

  const { register, handleSubmit, reset, control } = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const resultAction = await dispatch(
      createPromotion({
        ...data,
        start: format(date[0].startDate, "yyyy-MM-dd"),
        end: format(date[0].endDate, "yyyy-MM-dd"),
      })
    );

    if (createPromotion.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: (resultAction.payload as any).error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      reset();
      onClose();
    }
  };

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    setDate([selection]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Add New Promotion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridTemplateColumns="repeat(2,1fr)" gridGap="2rem">
            <Box>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Enter promotion title"
                  {...register("title", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Value</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Enter promotion value"
                    {...register("value", { required: true })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Enter promotion description"
                  {...register("desciption", { required: true })}
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel>Start Date - End Date</FormLabel>

              <DateRange
                locale={vi}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            </FormControl>
          </Grid>
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

export default AddPromotionModal;
