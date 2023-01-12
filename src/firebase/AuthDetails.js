import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./index";
import { useEffect, useState } from "react";

function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    }
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log(`${authUser.email} is signed out.`);
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed in as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed out</p>
      )}
    </div>
  );
}

export default AuthDetails;
