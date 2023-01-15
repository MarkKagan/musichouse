import {
  Button,
  Box,
  Link as ChakraLink,
  Text,
  Heading,
  VStack,
  StackDivider
} from "@chakra-ui/react";
import EventsItem from "../components/EventsItem";

const DUMMY_EVENTS = [
  {
    id: 1,
    date: "Jan. 9th, 2023",
    title: "New Host in Berlin",
    desc: "Please welcome our new host, Julia Roberts. She is new in Berlin. Make sure to contact her to organize a musical evening!",
  },
  {
    id: 2,
    date: "Jan. 3rd, 2023",
    title: "New Musician in Berlin",
    desc: "Jascha Heifetz is a new member of Music House. He has just completed his recording with Deutsche Grammophon.",
  },
  {
    id: 3,
    date: "Dec. 7th, 2022",
    title: "New Host in Berlin",
    desc: "Say hello to our new host, Clara Schumann. For those interested in piano chamber music, she has a grand piano in the house.",
  },
  {
    id: 4,
    date: "Nov. 15th, 2022",
    title: "New Musician in Berlin",
    desc: "Everyone knows Bob De Niro... He's been singing a lot lately, and is eager to display his new talents!",
  }
];

function WelcomePage() {
  return (
    <VStack>
      <Box>
        <Heading margin="30px">
          <Text as='u' textColor="blue.300" fontStyle="oblique" fontSize="md">
            Latest Events in Music House :{" "}
          </Text>
        </Heading>
      </Box>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          width="50%"
          p={4}
          borderWidth="3px"
          borderRadius="20px"
          borderColor="blue.100"
        >
      {DUMMY_EVENTS.map((event) => {
        return (
          <EventsItem key={event.id} date={event.date} title={event.title} desc={event.desc} />
        )
      })}
      </VStack>
    </VStack>
  );
}

export default WelcomePage;
