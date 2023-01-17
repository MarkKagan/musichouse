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
    <div>
    <button onClick={toggleAccount}>{`Login as ${toggleName}`}</button></div>
  )
}

export default AccountToggleButton;