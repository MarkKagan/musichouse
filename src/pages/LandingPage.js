import LogoutButton from "../logging-in/LogoutButton";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

function LandingPage() {
  const { activeAs } = useUserAuth();

  const searchType = activeAs === "musician" ? "host" : "musician";

  const {searchableUsers, signedInUser} = useFilteredUsersContext();
  // console.log(searchableUsers, signedInUser)

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/personal-profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/search">{`Search for ${searchType}s`}</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favorites</NavLink>
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
