import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router";

function LogoutButton() {
  const {user, logOut: signOff} = useUserAuth();
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/sign-in');
    signOff();
  }

  return (
    <div>
      {user && (
        <button onClick={logOut}>
          Log Out
        </button>
      )}
    </div>
  );

};

export default LogoutButton;