import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

import {
  Box,
  Text,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";

import React from "react";

function SearchedUser({ name, pictureUrl, description }) {
  return (
    <HStack>
      <Image
        src={pictureUrl}
        alt={name}
        maxWidth="8em"
        borderRadius="15px"
        fallbackSrc={require("../assets/default_avatar.png")}
      />
        <VStack>
          <Text color="#FF4651">{name}</Text>
          <Text>"{description}"</Text>
        </VStack>
    </HStack>
  );
}

export default SearchedUser;
