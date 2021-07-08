import {
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const QuickReview: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const { images, title, _id } = product;
  const history = useHistory();

  return (
    <Modal
      size="3xl"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Quick Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll" minH="20rem" maxH="40rem">
          <Image src={images[0]} margin="0 auto" w="50%" />
          <Heading fontSize="lg" mb="2rem" mt="1rem" textAlign="center">
            {title}
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {Object.entries(product.specifications).map((spec, i) => (
                <Tr key={i}>
                  <Td>{spec[0] as string}</Td>
                  <Td>{spec[1] as string}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => history.push(`/product/${_id}`)}
          >
            View Detail
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuickReview;
