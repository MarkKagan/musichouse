// import { database } from "../firebase";
// import {ref as databaseRef, child, get} from 'firebase/database';
import { useUserAuth } from "../firebase/UserAuthContext";
// import {useEffect, useState} from 'react';
import Leaflet from '../leaflet/Leaflet';
import { useFilteredUsersContext } from '../filtered-users-context/FilteredUsersContextProvider'; 


import { VStack, Box, Heading, StackDivider } from "@chakra-ui/react";
import SearchedUser from "../components/SearchedUser";

function Search() {
  const { searchableUsers, signedInUser } = useFilteredUsersContext();
  // console.log(searchableUsers, signedInUser);
  // const [searchResults, setSearchResults] = useState([]);
  const {activeAs} = useUserAuth();
  // console.log('activeAs: ', activeAs);
  const searchType = activeAs === 'musician' ? 'host' : 'musician';
  // let filteredUsers = [];

  // useEffect(() => {
  //   if (!activeAs) return;
  //   const usersRef = databaseRef(database) //removed 'users' from the path...is this ok?
    
  //   get(child(usersRef, '/')).then((snapshot) => { //refactored into try/catch
  //     if (snapshot.exists()) {
  //       const usersArray = Object.entries(snapshot.val());
  //       filteredUsers = usersArray.filter((user) => {
  //         return user[1][searchType].active === true
  //       })
  //       setSearchResults(filteredUsers);
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   })

  // }, [activeAs]);

  // console.log('searchResults - filteredUsers: ', filteredUsers);





  //don't forget to use key when creating the list
  return (
    // <Center backgroundColor="yellow.100" display="flex-bloc" justifyContent="center">
    <Box backgroundColor="yellow.100">
      <Box display="flex-block">
        <Heading
          fontWeight="thin"
          textColor="#FF4651"
          display="flex"
          justifyContent="center"
        >
          Available {searchType}s :{" "}
        </Heading>
        <Box margin="20px" display="flex" justifyContent="center">
          <Leaflet />
        </Box>
      </Box>

      <Box
        // width="50%"
        // p={4}
        // borderWidth="3px"
        // borderRadius="20px"
        // borderColor="blue.100"
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
        >
          {Object.entries(searchableUsers).map(([key, val]) => {
          const name = val.firstName + ' ' + val.lastName;
          const pictureUrl = val.pictureUrl;
          const description = val.description;
          return (
            <SearchedUser id={key} name={name} pictureUrl={pictureUrl} description={description} key={key}/>
          );
        })}
        </VStack>
      </Box>
    </Box>

    // </Center>
  );
}

export default Search;

