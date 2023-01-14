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

  const toggleName = activeAs === 'musician' ? 'host' : 'musician';

  return (
    <button onClick={toggleAccount}>{`Login as ${toggleName}`}</button>
  )
}

export default AccountToggleButton;