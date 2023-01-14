import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

import {
  FormControl,
  Button,
  Box,
  Heading,
  Link as ChakraLink,
  FormLabel,
  Input,
  RangeSliderThumb,
  Text,
  FormErrorMessage,
  Center,
  Stack,
  HStack,
  VStack,
  Image
} from "@chakra-ui/react";


import React from 'react'

function SearchedUser({name, pictureUrl, description}) {
  console.log(pictureUrl)
  return (
    <HStack>
      {/* <img alt={name} src={pictureUrl} /> */}
      <Box boxSize="sm">
        <Image
          src={pictureUrl}
          alt={name}
          borderRadius="15px"
          fallbackSrc="../assets/default_avatar.png"
        />
      </Box>
      <VStack>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </VStack>
    </HStack>
  );
}

export default SearchedUser;