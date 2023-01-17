import { Text, HStack, VStack, Image, IconButton, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import {
  ref as databaseRef,
  update,
  get,
  child,
  onValue,
} from "firebase/database";
import { useEffect, useState, useCallback } from "react";
import { database } from "../firebase";
import { useUserAuth } from "../firebase/UserAuthContext";

function SearchedUser({ name, pictureUrl, description, id, email, phone }) {
  const { signedInUser, favorites, setFavorites } = useFilteredUsersContext();
  const { user, activeAs } = useUserAuth();

  const [inFavs, setInFavs] = useState(null);

  useEffect(() => {
    console.log(id);

    if (favorites.includes(id)) setInFavs(true);
    else setInFavs(false);
  }, [favorites]);

  const favoriteHandler = () => {
    const refToUsersFavs = databaseRef(database, `${user.uid}/${activeAs}`);
    if (inFavs) {
      const tempFavs = favorites.filter((favorite) => {
        return favorite !== id;
      });
      setFavorites(tempFavs);
      updateFavoritesRequest(refToUsersFavs, { favorites: tempFavs });
    } else {
      const tempFavs = [...favorites, id];
      setFavorites(tempFavs);
      updateFavoritesRequest(refToUsersFavs, { favorites: tempFavs });
    }

    setInFavs(!inFavs);
  };

  const updateFavoritesRequest = async (ref, obj) => {
    try {
      await update(ref, obj);
    } catch (error) {
      console.log(error);
    }
  };

  if (!favorites) {
    return (
      <Box>
        <Text>No Favorites selected yet...</Text>
      </Box>
    );
  }

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
        <Text fontSize="sm">{`Email : ${email}`}</Text>
        <Text fontSize="sm">{`Phone : ${phone}`}</Text>
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
