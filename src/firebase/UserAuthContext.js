import React, { useState, useEffect, createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from './index';

const UserAuthContext = createContext({
  user: '',
  signUp: (email, password) => {},
  signIn: (email, password) => {},
  logOut: () => {}
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [activeAs, setActiveAs] = useState(null);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{user, signUp, signIn, logOut, activeAs, setActiveAs}}>
      {props.children}
    </UserAuthContext.Provider>
  )  
};

export function useUserAuth() {
  return useContext(UserAuthContext);
}
