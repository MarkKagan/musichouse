import LogoutButton from "../logging-in/LogoutButton";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";

function LandingPage() {
  const { activeAs } = useUserAuth();
  const searchType = activeAs === "musician" ? "host" : "musician";

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/personal-profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/search">{`Search for ${searchType}s`}</NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;
