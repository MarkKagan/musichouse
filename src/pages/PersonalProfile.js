import UserProfile from "../components/UserProfile";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import { useUserAuth } from "../firebase/UserAuthContext";

function PersonalProfile() {
  const {user, activeAs} = useUserAuth();
  // const currentUs
  const { signedInUser } = useFilteredUsersContext();
  const id = user.uid;
  // console.log(signedInUser)
  const userName =
    signedInUser[id][activeAs].firstName +
    " " +
    signedInUser[id][activeAs].lastName;
  const {pictureUrl} = signedInUser[id][activeAs]
  // console.log(signedInUser[id][activeAs].profilePicUrl)

  // console.log(profilePicUrl)
  
  return (
    <div>
      <img alt={userName} src={pictureUrl} />
      <div>{userName}</div>
      {/* <UserProfile /> */}
    </div>
  );
}

export default PersonalProfile;
