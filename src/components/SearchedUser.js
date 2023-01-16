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
import { ref as databaseRef, update, get, child } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { useUserAuth } from "../firebase/UserAuthContext";

function SearchedUser({ name, pictureUrl, description, id }) {
  const { signedInUser } = useFilteredUsersContext();
  const { user, activeAs } = useUserAuth();
  const [inFavs, setInFavs] = useState(null);
  const [currentFavs, setCurrentFavs] = useState(null);

  const favoriteHandler = async () => {
    if (!signedInUser) return;
    // if (inFavs) {

    // }
    const refToUserPath = databaseRef(database, `${user.uid}/${activeAs}`);
    const currentFavorites = signedInUser[user.uid][activeAs]?.favorites?.length
      ? signedInUser[user.uid][activeAs].favorites
      : [];
    console.log("CURRENT FAVORITES", currentFavorites);
    const updatedFavorites = () => {
      if (currentFavorites.includes(id)) {
        const indexOfId = currentFavorites.indexOf(id);
        return currentFavorites.splice(indexOfId, 1); //check result
      } else {
        return currentFavorites.concat([id]);
      }
    };
    console.log("updatedFavorites()", updatedFavorites());
    const updatedFavoritesProp = { favorites: updatedFavorites() };
    try {
      await update(refToUserPath, updatedFavoritesProp);
      console.log(
        `SUCCESS - ${name} ${
          inFavs ? "removed from" : "added to"
        } your favorites!`
      );
      setInFavs(!inFavs);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(inFavs)

  useEffect(() => {
    if (!signedInUser) return;


    const emptyFaveSetter = async () => {
      try {
        const signedInUserRef = databaseRef(database, `${user.id}`);
        const userOb = await get(child(signedInUserRef, "/"));
        if (userOb.exists()) {
          const faves = Object.fromEntries(
            Object.entries(userOb.val()[user.uid][activeAs].favorites)
          );
          setCurrentFavs(faves);
        }
      } catch (error) {
        console.log(error);
      }
    };
    emptyFaveSetter();


    let inFavorites;
    const pathToFavs = signedInUser[user.uid][activeAs].favorites;
    console.log(pathToFavs);
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

    return () => {   //is this right??
      emptyFaveSetter();
    }

  }, [signedInUser[user.uid][activeAs].favorites]); //why not pathToFavs?

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
      />
    </HStack>
  );
}

export default SearchedUser;
