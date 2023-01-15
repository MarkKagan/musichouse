import {
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

function EventsItem({date, title, desc}) {
  return (
    <Box>
      <Flex flexDirection="row-reverse" fontStyle="oblique">{date}</Flex>
      <Heading textColor="red.300" fontSize="md" fontStyle="oblique">{title}</Heading>
      <Text paddingTop="1em">{desc}</Text>
    </Box>
  )
}

export default EventsItem;
