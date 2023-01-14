import { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set, ref as databaseRef } from "firebase/database";
import { database } from "../firebase/index";
import userInfoInit from '../forms/userInfoInit';

import {
  FormControl,
  Button,
  Box,
  Heading,
  Link as ChakraLink,
  FormLabel,
  Input,
  Text,
  Center
} from "@chakra-ui/react";


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const { user } = useUserAuth();

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const { signUp: createNewUser } = useUserAuth();
  const navigate = useNavigate();
  const register = async (event) => {
    //create user in firebase auth
    event.preventDefault();
    try {
      const createdUser = await createNewUser(email, password);
      if (createdUser.user.email) {
        const databaseUserRef = databaseRef(database, `${createdUser.user.uid}/`);
        const createdUserDB = {
          musician: userInfoInit,
          host: userInfoInit
        };
        //initialize a user in the database (could have info as both musician and/or host)
        set(databaseUserRef, createdUserDB)
          .then(() => {
            console.log("SUCCESS");
          })
          .catch((error) => {
            console.log("ERROR: ", error);
          });
        navigate("/sign-in");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      setError(err.message);
    }
  };


  return (
    <Center marginTop="40px">
      <Box
        width="50%"
        p={4}
        borderWidth="3px"
        borderRadius="20px"
        borderColor="blue.100"
      >
        <Heading color="yellow.300" textAlign="center">
          Sign Up
        </Heading>
        {error && <Text color="red">{error}</Text>}
        <form onSubmit={register}>
          <FormControl>
            <FormLabel htmlFor="email-sign-up">Email</FormLabel>
            <Input
              onChange={emailChangeHandler}
              type="email"
              id="email-sign-up"
            />
            {/* {error && <FormErrorMessage>{error.message}</FormErrorMessage>} */}
            <br />
            <FormLabel htmlFor="password-sign-up">Password</FormLabel>
            <Input
              onChange={passwordChangeHandler}
              type="password"
              id="password-sign-up"
            />
            <Button
              colorScheme="teal"
              alignSelf="center"
              marginTop="8px"
              type="submit"
            >
              Sign Up
            </Button>
          </FormControl>
        </form>

        <Text>
          Already have an account?{" "}
          <ChakraLink color="blue.300" as={Link} to="/sign-in">
            {" "}
            Login
          </ChakraLink>
        </Text>
      </Box>
    </Center>
  );
}

export default SignUp;
