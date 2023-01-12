import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";

function PrivateRoute({children}) {
  const {user} = useUserAuth();
  // const location = useLocation();

  if (!user) {
    return <Navigate to='/sign-in' />
  }
  return children;

  // if (!user) {
  //   return <Navigate to='/sign-in' replace state={{from: location}} />
  // }
  // return children;
};

export default PrivateRoute;
