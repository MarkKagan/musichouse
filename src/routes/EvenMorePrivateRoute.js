import { Navigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";

function EvenMorePrivateRoute({ children }) { //ISSUE WITH ACTIVEAS BEING UPDATED
  const { activeAs } = useUserAuth();

  if (!activeAs) {
    return <Navigate to="/home" />;
  }
  return children;
}

export default EvenMorePrivateRoute;
