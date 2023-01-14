import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

function UserProfile() {
  const {signedInUser} = useFilteredUsersContext();

  return (
    <div>
      <img
        alt={signedInUser.firstName + " " + signedInUser.lastName}
        src={signedInUser.pictureUrl}
      />

      <h2>{signedInUser.firstName + " " + signedInUser.lastName}</h2>
    </div>
  );
}

export default UserProfile