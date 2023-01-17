import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useUserAuth } from "../firebase/UserAuthContext";
import ProfileAs from "./ProfileAs";

import {
  Box,
} from "@chakra-ui/react";

function UserProfile() {
  const {user} = useUserAuth();
  const {signedInUser} = useFilteredUsersContext();

  const userObj = signedInUser[user.uid];

  const musician = userObj['musician'].active;
  const host = userObj['host'].active

  return (
    <Box minHeight="-webkit-max-content" backgroundColor="yellow.100">
      <Box padding="2em">{musician && <ProfileAs loggedInAs="musician" />}</Box>
      <Box padding="2em">{host && <ProfileAs loggedInAs="host" />}</Box>
    </Box>
  );
}

export default UserProfile;