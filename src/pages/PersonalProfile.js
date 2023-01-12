import UserProfile from "../components/UserProfile";
import { useUserAuth } from "../firebase/UserAuthContext";

function PersonalProfile() {
  const {user} = useUserAuth();

  return (
    <div>
    <div>PersonalProfile</div>
    <UserProfile />
    </div>
  )
}

export default PersonalProfile;