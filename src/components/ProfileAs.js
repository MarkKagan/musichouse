import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useUserAuth } from "../firebase/UserAuthContext";

import {Editable, EditablePreview, EditableInput, Heading, Text, Box, TagLabel, EditableTextarea} from "@chakra-ui/react";

function ProfileAs({loggedInAs}) {
  const {user} = useUserAuth();
  const {signedInUser} = useFilteredUsersContext();

  const {firstName, lastName, country, city, street, houseNumber, postalCode, email, phone, description} = signedInUser[user.uid][loggedInAs];


  return (
    <Box>
      <Heading fontSize="md">
        <Text>{`Your ${loggedInAs} account : `}</Text>
      </Heading>
      <Editable defaultValue={`${firstName}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${lastName}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${country}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${city}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${street}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${houseNumber}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${postalCode}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${email}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${phone}`}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue={`${description}`}>
        <EditablePreview />
        <EditableTextarea />
      </Editable>
    </Box>
  );
}

export default ProfileAs;