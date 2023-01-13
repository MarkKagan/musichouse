// import { database } from "../firebase";
// import {ref as databaseRef, child, get} from 'firebase/database';
import { useUserAuth } from "../firebase/UserAuthContext";
// import {useEffect, useState} from 'react';
import Leaflet from '../leaflet/Leaflet';
import { useFilteredUsersContext } from '../filtered-users-context/FilteredUsersContextProvider'; 

function Search() {
  const { searchableUsers, signedInUser } = useFilteredUsersContext();
  console.log(searchableUsers, signedInUser);
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
    <div>
      <Leaflet />
      <h1>List of available {searchType}s : </h1>
      {searchableUsers.map((user) => {
        return (
          <div key={user[0]}>
            <p>{`${user[1][searchType].firstName} ${user[1][searchType].lastName}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
