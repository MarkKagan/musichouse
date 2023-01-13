import {useState, useEffect, createContext, useContext} from 'react';
import { useUserAuth } from '../firebase/UserAuthContext';
import {ref as databaseRef, child, get} from 'firebase/database';
import { database } from "../firebase";



const FilteredUsersContext = createContext({searchableUsers: {}, signedInUser: {}});

export const FilteredUsersContextProvider = ({children}) => {
  const {activeAs, user: currentUser} = useUserAuth();
  const signedInUserId = currentUser.uid;  // CHECK THIS! 
  
  const [searchableUsers, setSearchableUsers] = useState([]);
  const [signedInUser, setSignedInUser] = useState({});

  const searchType = activeAs === 'musician' ? 'host' : 'musician';


  useEffect(() => {
    if (!activeAs) {
      console.log("activeAs is not defined...there is some error!");
      return;
    }
    const emptyFilteredUsers = async () => {
      try {
        const usersRef = databaseRef(database);
        const allUsers = await get(child(usersRef, '/'));
        if (allUsers.exists()) {
          const filteredUsers = Object.fromEntries(Object.entries(allUsers.val()).filter(([key, val]) => {
            return (signedInUserId !== key && val[searchType].active === true);
          }).map(([key, val]) => {
            console.log([key, val]);
            return [key, val[searchType]]; 
          }));
          const me = Object.fromEntries(
            Object.entries(allUsers.val()).filter(([key, val]) => {
              return signedInUserId === key;
            })
          );
          // const filteredUsers = usersArray.filter((user) => { //HERE THE INDEX SHOULD CORRESPOND TO THE USER UID
          //   return (signedInUserId !== user[0] && user[1][searchType].active === true)
          // })
          // .map((entireUser) => {
          //   return {entireUser[0]: entireUser[searchType]}
          // }) //perform a map HERE!  
          // const me = usersArray.filter((user) => {
          //   return signedInUserId === user[0];
          // })
          setSearchableUsers(filteredUsers);
          setSignedInUser(me);
        }
      } catch (error) {
        console.log(error);
      }
    };
    emptyFilteredUsers(); //make sure this is correct!

    return () => {
      emptyFilteredUsers();
    }
  }, [activeAs])

  return (
    <FilteredUsersContext.Provider value={{searchableUsers, signedInUser}}>
      {children}
    </FilteredUsersContext.Provider>
  )
}

export function useFilteredUsersContext() {
  return useContext(FilteredUsersContext);
}
