import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useUserAuth } from "../firebase/UserAuthContext";
import ProfileAs from "./ProfileAs";
import {Link as ReactLink} from 'react-router-dom';

import { Box, Button, Flex, Link } from "@chakra-ui/react";

function UserProfile() {
  const { user } = useUserAuth();
  const { signedInUser } = useFilteredUsersContext();

  const userObj = signedInUser[user.uid];

  const musician = userObj["musician"].active;
  const host = userObj["host"].active;

  const toBeCreated = !musician ? "musician" : !host ? "host" : false;
  console.log(toBeCreated)

  return (
    <Flex minHeight="100vh" backgroundColor="yellow.100" flexDirection="column">

      {toBeCreated && (
        <Link as={ReactLink} to="/musician-form">
          <Button
            as={Link}
            to="/musician-form"
            colorScheme="teal"
            alignSelf="center"
            type="submit"
            margin="2em"
          >{`Create an Account as a ${toBeCreated} `}</Button>
        </Link>
      )}

      <Box display="flex">
        <Box padding="2em" width="50%">
          {musician && <ProfileAs loggedInAs="musician" />}
        </Box>
        <Box width="50%" padding="2em">
          {host && <ProfileAs loggedInAs="host" />}
        </Box>
      </Box>
    </Flex>
  );
}

export default UserProfile;
