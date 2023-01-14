import {Text, Box, Center} from "@chakra-ui/react";

function Explanation() {
  return (
    <Center marginTop="40px">
      <Box
        width="80%"
        p={4}
        borderWidth="3px"
        borderRadius="20px"
        borderColor="blue.100"
        alignSelf="center"
      >
        <Text>
          When I was a kid living in Saint Petersburg, Russia, my grandparents
          would organize dinners with family and friends. During these evenings,
          they would sing, play instruments, drink, and enjoy life. I recall my
          grandfather's friend who would always accompany the singing with a
          balalaika, one leg propped against the wall. My grandparent's friends
          had a talent for creating original lyrics to well-known tunes. Their
          daughter, like me, would also play violin during these beautiful
          gatherings.{" "}
        </Text>
        <br />
        <Text>
          My sincere hope is to help recreate this feeling with the help of
          music.
        </Text>
      </Box>
    </Center>
  );
}

export default Explanation;