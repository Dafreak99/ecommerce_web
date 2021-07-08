import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getPromotions,
  promotionSelector,
  removePromotion,
} from "../../../features/promotions/promotionSlice";
import AddPromotionModal from "./AddPromotionModal";
import EditPromotionModal from "./EditPromotionModal";

interface Props {}

const Promotion: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const promotions = useAppSelector(promotionSelector.selectAll);

  useEffect(() => {
    dispatch(getPromotions());
  });
  const renderColorScheme = (status: boolean) => {
    if (status) {
      return "green";
    } else {
      return "red";
    }
  };

  const onHandleDelete = (id: string) => {
    dispatch(removePromotion(id));
  };

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Promotions</Heading>
        <Button
          textTransform="uppercase"
          bg="primary"
          color="#fff"
          onClick={onOpen}
        >
          <Icon as={AiOutlinePlus} mr="0.5rem" /> Add promotion
        </Button>
        <AddPromotionModal isOpen={isOpen} onClose={onClose} />
      </Flex>

      <Table variant="simple" bg="#fff">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>TITLE</Th>
            <Th>DESCRIPTION</Th>
            <Th>VALUE</Th>
            <Th>START</Th>
            <Th>END</Th>
            <Th>ACTIVE</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <TransitionGroup component="tbody">
          {promotions.map(
            ({ title, desciption, is_active, start, end, value, _id }, i) => (
              <CSSTransition key={_id} timeout={500} classNames="item">
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{title}</Td>
                  <Td>{desciption}</Td>
                  <Td>{value}%</Td>
                  <Td>{format(new Date(start), "dd-MM-yy")}</Td>
                  <Td>{format(new Date(end), "dd-MM-yy")}</Td>

                  <Td>
                    {" "}
                    <Badge colorScheme={renderColorScheme(is_active)}>
                      {is_active.toString()}
                    </Badge>
                  </Td>
                  <Td>
                    <EditPromotionModal id={_id} />
                  </Td>
                  <Td>
                    <Icon
                      as={FaTrash}
                      cursor="pointer"
                      onClick={() => onHandleDelete(_id)}
                    />
                  </Td>
                  {/* <Td>
                    <Button onClick={() => history.push(`./order/${_id}`)}>
                      View Detail
                    </Button>
                  </Td> */}
                </Tr>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Promotion;
