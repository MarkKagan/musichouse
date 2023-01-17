import { useUserAuth } from "../firebase/UserAuthContext";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { ref as databaseRef, update, get, child } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";

async function AddFavHandler(ID, NAME) {
  const { signedInUser } = useFilteredUsersContext();
  const { user, activeAs } = useUserAuth();
  const [inFavs, setInFavs] = useState(null);
  const [currentFavs, setCurrentFavs] = useState(null);

  //SETS THE FAVORITES FROM DATABASE
  useEffect(() => {
    if (!signedInUser) return;

    const emptyFaveSetter = async () => {
      try {
        const signedInUserRef = databaseRef(database, `${user.ID}`);
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

    return () => {
      //is this right??
      emptyFaveSetter();
    };
  }, [signedInUser[user.uid][activeAs].favorites]); //why not pathToFavs?


  //UPDATE THE DATABASE WITH THE NEW FAVORITES
  const refToUserPath = databaseRef(database, `${user.uid}/${activeAs}`);
  const currentFavorites = signedInUser[user.uid][activeAs]?.favorites?.length
    ? signedInUser[user.uid][activeAs].favorites
    : [];
  console.log("CURRENT FAVORITES", currentFavorites);
  const updatedFavorites = () => {
    if (currentFavorites.includes(ID)) {
      const indexOfId = currentFavorites.indexOf(ID);
      return currentFavorites.splice(indexOfId, 1); //check result
    } else {
      return currentFavorites.concat([ID]);
    }
  };
  console.log("updatedFavorites()", updatedFavorites());
  const updatedFavoritesProp = { favorites: updatedFavorites() };
  try {
    await update(refToUserPath, updatedFavoritesProp);
    console.log(
      `SUCCESS - ${NAME} ${
        inFavs ? "removed from" : "added to"
      } your favorites!`
    );
    setInFavs(!inFavs);
  } catch (error) {
    console.log(error);
  }
}

export default AddFavHandler;
