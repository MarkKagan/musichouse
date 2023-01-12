import { Link } from "react-router-dom";
import {useUserAuth} from "../firebase/UserAuthContext";

function Home() {

  const {setActiveAs} = useUserAuth();

  const loginAsMusician = () => {
    setActiveAs('musician');
  };
  const loginAsHost = () => {
    setActiveAs('host');
  };

  return (
    <>
      <p>
        Welcome to Music House! Here things are simple. We love classical music
        and want to create a space to help musicians and hosts find each other.
        For details please click{" "}
        <Link>
          <span>here</span>
        </Link>
        .
      </p>
      <br />
      <p>
        The first step is to register as either a musician or ensemble, or a
        host. If you are interested in both, you will be able to add another
        profile later.
      </p>

      <Link to="/landing-page" onClick={loginAsMusician}>
        <button>Log in as musician</button>
      </Link>

      <Link to="/landing-page" onClick={loginAsHost}>
        <button>Log in as host</button>
      </Link>

      <Link to="/musician-form">
        <span>Register as a musician</span>
      </Link>
      <Link to="/host-form">
        <span>Register as a host</span>
      </Link>
    </>
  );
}

export default Home;
