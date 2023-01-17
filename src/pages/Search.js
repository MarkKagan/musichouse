import { useUserAuth } from "../firebase/UserAuthContext";
import Leaflet from "../leaflet/Leaflet";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

import { VStack, Box, Heading, StackDivider } from "@chakra-ui/react";
import SearchedUser from "../components/SearchedUser";

function Search() {
  const { searchableUsers, signedInUser } = useFilteredUsersContext();

  const { activeAs } = useUserAuth();
  const searchType = activeAs === "musician" ? "host" : "musician";

  console.log(Object.entries(searchableUsers));

  return (
    <Box backgroundColor="yellow.100">
      <Box display="flex-block">
        <Heading
          fontWeight="thin"
          textColor="#FF4651"
          display="flex"
          justifyContent="center"
          fontSize="2em"
          paddingTop="1em"
        >
          Available {searchType}s :{" "}
        </Heading>
        <Box margin="20px" display="flex" justifyContent="center">
          <Leaflet />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          width="50%"
          p={4}
          borderWidth="3px"
          borderRadius="20px"
          borderColor="blue.100"
          marginTop="2em"
        >
          {Object.entries(searchableUsers).map(([key, val]) => {
            const name = val.firstName + " " + val.lastName;
            const pictureUrl = val.pictureUrl;
            const description = val.description;
            const email = val.email;
            const phone = val.phone;

            return (
              <SearchedUser
                email={email}
                phone={phone}
                id={key}
                name={name}
                pictureUrl={pictureUrl}
                description={description}
                key={key}
              />
            );
          })}
        </VStack>
      </Box>
    </Box>

    // </Center>
  );
}

export default Search;
