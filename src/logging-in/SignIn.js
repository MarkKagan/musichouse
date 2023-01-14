import { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import FlexBox from "../chakraui/FlexBox";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const { signIn: logIn} = useUserAuth();

  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
    try {
      const signedInUser = await logIn(email, password);
      if (signedInUser.user.email) {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FlexBox> 
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={login}>
        <label htmlFor="email-sign-in">Email</label>
        <input onChange={emailChangeHandler} type="email" id="email-sign-in" />
        <label htmlFor="password-sign-in">Password</label>
        <input
          onChange={passwordChangeHandler}
          type="password"
          id="password-sign-in"
        />
        <button type="submit">Sign In</button>
      </form>

      <p>
        Not registered yet?
        <span>
          <Link to="/sign-up"> Sign Up</Link>
        </span>
      </p>
    </FlexBox>
  );
}

export default SignIn;
