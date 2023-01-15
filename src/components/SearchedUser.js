import {
  Text,
  HStack,
  VStack,
  Image,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { ref as databaseRef, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { useUserAuth } from "../firebase/UserAuthContext";

function SearchedUser({ name, pictureUrl, description, id }) {
  const { searchableUsers, signedInUser } = useFilteredUsersContext();
  const { user, activeAs } = useUserAuth();
  const [inFavs, setInFavs] = useState(null);

  const favoriteHandler = async () => {
    console.log('inside favoriteHandler')
    if (!signedInUser) return;
    const refToUserPath = databaseRef(database, `${user.uid}/${activeAs}`);
    const currentFavorites = signedInUser[user.uid][activeAs].favorites
      ? signedInUser[user.uid][activeAs].favorites
      : [];
    const updatedFavorites = () => {
      if (currentFavorites.includes(id)) {
        const indexOfId = currentFavorites.indexOf(id);
        return currentFavorites.splice(indexOfId, 1);
      } else {
        return currentFavorites.push(id);
      }
    };
    try {
      const response = await update(refToUserPath, updatedFavorites());
      if (response.ok)
        console.log(`SUCCESS - ${name} added to your favorites!`);
    } catch (error) {
      console.log(`ERROR adding ${name} to favorites: `, error);
    }
  };

  useEffect(() => {
    if (!signedInUser) return;
    let inFavorites;
    const pathToFavs = signedInUser[user.uid][activeAs].favorites;
    if (!pathToFavs) inFavorites = false;
    else {
      if (!pathToFavs.includes(id)) {
        inFavorites = false;
      } else {
        if (pathToFavs.includes(id)) {
          inFavorites = true;
        }
      }
    }
    setInFavs(inFavorites);
  }, [signedInUser]);

  return (
    <HStack>
      <Image
        src={pictureUrl}
        alt={name}
        maxWidth="8em"
        borderRadius="15px"
        fallbackSrc={require("../assets/default_avatar.png")}
      />
      <VStack>
        <Text color="#FF4651">{name}</Text>
        <Text>"{description}"</Text>
      </VStack>
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={
          inFavs ? (
            <StarIcon color="#FF4651" onClick={favoriteHandler} />
          ) : (
            <StarIcon onClick={favoriteHandler} />
          )
        }
        size="xs"
        display="relative"
        bottom="40%"
        right="1%"
        // onClick={favoriteHandler}
      />
    </HStack>
  );
}

export default SearchedUser;
