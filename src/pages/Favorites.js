import {VStack, StackDivider, Box} from "@chakra-ui/react";

import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useUserAuth } from "../firebase/UserAuthContext";
import {useState, useEffect} from 'react';
import SearchedUser from "../components/SearchedUser";

function Favorites() {
  console.log('in favorites component')
  const [loadedFavs, setLoadedFavs] = useState([]); //ID numbers
  const {user,activeAs} = useUserAuth();
  const {searchableUsers, signedInUser} = useFilteredUsersContext();

  useEffect(() => {
    if (!signedInUser) return;
    const checkedFavs = signedInUser[user.uid][activeAs].favorites ? signedInUser[user.uid][activeAs].favorites : [];
    setLoadedFavs(checkedFavs)
  }, [signedInUser])

  const favoritedUsersIDs = Object.entries(searchableUsers).filter((key, val) => {
    loadedFavs.includes(key);
  }, [])

  const filteredSearchableUsers = Object.entries(searchableUsers).filter(([key, val]) => {
    return loadedFavs.includes(key);
  })

  
  console.log(filteredSearchableUsers)
  return (
    // <VStack backgroundColor="yellow.100" minHeight="100vh">
    <Box
      backgroundColor="yellow.100"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
    >
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
        marginTop="1em"
      >
        {filteredSearchableUsers.map(([key, val]) => {
          const name = val.firstName + " " + val.lastName;
          const pictureUrl = val.pictureUrl;
          const description = val.description;
          return (
            <SearchedUser
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
  );
}

export default Favorites;