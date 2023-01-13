import UserProfile from "../components/UserProfile";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

function PersonalProfile() {
  const { signedInUser } = useFilteredUsersContext();
  

  return (
    <div>
      <div>PersonalProfile</div>
      <UserProfile />
    </div>
  );
}

export default PersonalProfile;
