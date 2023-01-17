import { VStack, StackDivider, Text, Heading, Flex, Center } from "@chakra-ui/react";

import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useEffect } from "react";
import SearchedUser from "../components/SearchedUser";

function Favorites() {
  console.log("in favorites component");
  const { searchableUsers, signedInUser, favorites } =
    useFilteredUsersContext();

  useEffect(() => {
    if (!signedInUser) return;
  }, [signedInUser]);

  const filteredSearchableUsers = Object.entries(searchableUsers).filter(
    ([key, val]) => {
      return favorites.includes(key);
    }
  );

  return (
    <Flex
      backgroundColor="yellow.100"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Heading
        fontWeight="thin"
        textColor="#FF4651"
        display="flex"
        justifyContent="center"
        fontSize="2em"
        paddingTop="1em"
      >
        My Favorites :
      </Heading>
        {favorites.length > 0 && (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            width="50%"
            p={4}
            borderWidth="3px"
            borderRadius="20px"
            borderColor="blue.100"
            backgroundColor="yellow.100"
            marginTop="2em"
          >
            {filteredSearchableUsers.map(([key, val]) => {
              const name = val.firstName + " " + val.lastName;
              const pictureUrl = val.pictureUrl;
              const description = val.description;
              const email = val.email;
              const phone = val.phone;
              return (
                <SearchedUser
                  id={key}
                  name={name}
                  pictureUrl={pictureUrl}
                  description={description}
                  key={key}
                  email={email}
                  phone={phone}
                />
              );
            })}
          </VStack>
        )}
      {favorites.length === 0 && (
        <Center marginTop="4em">
          <Text color="red.300">You have not selected any favorites...</Text>
        </Center>
      )}
      {/* </Flex> */}
    </Flex>
  );
}

export default Favorites;
