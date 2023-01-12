import "./App.css";
import SignIn from "./logging-in/SignIn";
import SignUp from "./logging-in/SignUp";
// import AuthDetails from "./firebase/AuthDetails";
import { AuthProvider } from "./firebase/UserAuthContext";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MusicianForm from "./forms/MusiciansForm/MusicianForm";
import HostForm from "./forms/HostsForm/HostForm";
import PrivateRoute from "./routes/PrivateRoute";

import NoMatch from "./error/NoMatch";
import LandingPage from "./pages/LandingPage";
import PersonalProfile from "./pages/PersonalProfile";
import Search from "./pages/Search";

//clarify whether a protected route always has to be wrapped with <PrivateRoute></PrivateRoute>

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/landing-page" element={<LandingPage />} />
                  <Route
                    path="/personal-profile"
                    element={<PersonalProfile />}
                  />
                  <Route path="/search" element={<Search />} />
                  <Route path="/musician-form" element={<MusicianForm />} />
                  <Route path="/host-form" element={<HostForm />} />
                </Routes>
              </PrivateRoute>
            }
          ></Route>

          {/* <AuthDetails /> */}
          <Route path="*" element={<SignIn />} />
        </Routes>

        {/* <Route path="*" element={<NoMatch />} /> */}
      </AuthProvider>
    </div>
  );
}

export default App;
