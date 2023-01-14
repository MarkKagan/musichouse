import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {ThemeToggler2} from "./chakraui/ColorMode";


import SignIn from "./logging-in/SignIn";
import SignUp from "./logging-in/SignUp";
// import AuthDetails from "./firebase/AuthDetails";
import { AuthProvider } from "./firebase/UserAuthContext";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MusicianForm from "./forms/MusiciansForm/MusicianForm";
import HostForm from "./forms/HostsForm/HostForm";
import PrivateRoute from "./routes/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import PersonalProfile from "./pages/PersonalProfile";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import { FilteredUsersContextProvider } from "./filtered-users-context/FilteredUsersContextProvider";
import EvenMorePrivateRoute from "./routes/EvenMorePrivateRoute";

//clarify whether a protected route always has to be wrapped with <PrivateRoute></PrivateRoute>

function App() {

  return (
    // <ChakraProvider>
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
                  <Route path="/musician-form" element={<MusicianForm />} />
                  <Route path="/host-form" element={<HostForm />} />
                  <Route path="/home" element={<Home />} />

                  <Route
                    path="*"
                    element={
                      <FilteredUsersContextProvider>
                        <EvenMorePrivateRoute>
                          <Routes>
                            <Route
                              path="/landing-page"
                              element={<LandingPage />}
                            />
                            <Route
                              path="/personal-profile"
                              element={<PersonalProfile />}
                            />
                            <Route path="/search" element={<Search />} />
                            <Route path="/favorites" element={<Favorites />} />
                          </Routes>
                        </EvenMorePrivateRoute>
                      </FilteredUsersContextProvider>
                    }
                  ></Route>
                </Routes>
              </PrivateRoute>
            }
          ></Route>

          {/* <AuthDetails /> */}
          <Route path="*" element={<SignIn />} />
        </Routes>

      </AuthProvider>
    // </ChakraProvider>
  );
}

export default App;
