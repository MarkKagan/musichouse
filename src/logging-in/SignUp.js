import { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set, ref as databaseRef } from "firebase/database";
import { database } from "../firebase/index";
import userInfoInit from '../forms/userInfoInit';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const { user } = useUserAuth();

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const { signUp: createNewUser } = useUserAuth();
  const navigate = useNavigate();
  const register = async (event) => {
    //create user in firebase auth
    event.preventDefault();
    try {
      const createdUser = await createNewUser(email, password);
      if (createdUser.user.email) {
        const databaseUserRef = databaseRef(database, `${createdUser.user.uid}/`);
        const createdUserDB = {
          musician: userInfoInit,
          host: userInfoInit
        };
        //initialize a user in the database (could have info as both musician and/or host)
        set(databaseUserRef, createdUserDB)
          .then(() => {
            console.log("SUCCESS");
          })
          .catch((error) => {
            console.log("ERROR: ", error);
          });
        navigate("/sign-in");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={register}>
        <label htmlFor="email-sign-up">Email</label>
        <input onChange={emailChangeHandler} type="email" id="email-sign-up" />
        <label htmlFor="password-sign-up">Password</label>
        <input
          onChange={passwordChangeHandler}
          type="password"
          id="password-sign-up"
        />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?
        <span>
          <Link to="/sign-in"> Login</Link>
        </span>
      </p>
    </>
  );
}

export default SignUp;
