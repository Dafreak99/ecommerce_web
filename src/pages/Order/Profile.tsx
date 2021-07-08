import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotonePhone } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { useAppSelector } from "../../app/hooks";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";

interface Props {}

const Profile: React.FC<Props> = () => {
  const { status, profile } = useAppSelector((state) => state.profile);

  return (
    <>
      <Heading mb="2rem" fontSize="lg">
        Your profile
      </Heading>
      <Box
        p="3rem 2rem"
        borderRadius="5px"
        bg="primary"
        color="#fff"
        mb="2rem"
        w="max-content"
        boxShadow="0 10px 30px #93eecc"
        position="relative"
      >
        {status === "pending" && (
          <Flex justify="center" alignItems="center">
            <Spinner />
          </Flex>
        )}
        {status === "succeeded" && (
          <>
            <Heading fontSize="xl">
              👋 Hello, {profile.first_name + " " + profile.last_name}
            </Heading>
            <List spacing={4} mt="2rem">
              <ListItem fontWeight="semibold">
                <Icon as={MdEmail} /> Email:{" "}
                <Box as="span" fontWeight="normal">
                  {profile.email}
                </Box>
              </ListItem>
              <ListItem fontWeight="semibold">
                <Icon as={RiCharacterRecognitionFill} /> First name:{" "}
                <Box as="span" fontWeight="normal">
                  {profile.first_name}
                </Box>
              </ListItem>
              <ListItem fontWeight="semibold">
                <Icon as={RiCharacterRecognitionFill} /> Last name:{" "}
                <Box as="span" fontWeight="normal">
                  {profile.last_name}
                </Box>
              </ListItem>
              <ListItem fontWeight="semibold">
                <Icon as={FaAddressBook} /> Address:{" "}
                <Box as="span" fontWeight="normal">
                  {profile.address}
                </Box>
              </ListItem>
              <ListItem fontWeight="semibold">
                <Icon as={AiTwotonePhone} /> Phone:{" "}
                <Box as="span" fontWeight="normal">
                  {profile.phone}
                </Box>
              </ListItem>
            </List>

            <EditProfileModal profile={profile} />
            <ChangePasswordModal />
          </>
        )}
      </Box>
    </>
  );
};

export default Profile;
