import LogoutButton from "../logging-in/LogoutButton";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import AccountToggleButton from "../logging-in/AccountToggleButton";
// import ProfileDropDown from "../components/ProfileDropDown";

function LandingPage() {
  const { activeAs } = useUserAuth();

  const searchType = activeAs === "musician" ? "host" : "musician";

  const {searchableUsers, signedInUser} = useFilteredUsersContext();

  return (
    <div>
      <nav>
        <ul>
          <li>
            {/* <ProfileDropDown /> */}
            <NavLink to="/personal-profile">Profile</NavLink>
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
          <li>
            <AccountToggleButton />
          </li>
        </ul>
      </nav>
    </div>
    // <nav class="navbar">
    //   <NavLink to="/favorites">Favorites</NavLink>
    //   <LogoutButton />
    // </nav>
  );
}

export default LandingPage;
