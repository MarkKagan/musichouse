import React from 'react'
import { useUserAuth } from "../firebase/UserAuthContext";


function AccountToggleButton() {
    const { activeAs, setActiveAs } = useUserAuth();

  const toggleAccount = () => {
    if (!activeAs) return;
    if (activeAs === 'musician') {
      setActiveAs('host');
    } else {
      setActiveAs('musician');
    }; 
  }

  return (
    <button onClick={toggleAccount}>Toggle Account</button>
  )
}

export default AccountToggleButton;