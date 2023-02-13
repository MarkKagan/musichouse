import { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FormControl,
  Button,
  Box,
  Heading,
  Link as ChakraLink,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Center,
  Flex,
  Image
} from "@chakra-ui/react";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const { signIn: logIn } = useUserAuth();

  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
    try {
      const signedInUser = await logIn(email, password);
      if (signedInUser.user.email) {
        navigate("/home");
      }
    } catch (err) {
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
        alignSelf="center"
      >
        <Heading color="yellow.300" textAlign="center">
          Sign In
        </Heading>
        {error && <Text color="red">{error}</Text>}
        <form onSubmit={login}>
          <FormControl>
            <FormLabel htmlFor="email-sign-in">Email</FormLabel>
            <Input
              onChange={emailChangeHandler}
              type="email"
              id="email-sign-in"
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            <br />
            <FormLabel htmlFor="password-sign-in">Password</FormLabel>
            <Input
              onChange={passwordChangeHandler}
              type="password"
              id="password-sign-in"
            />
            <Button colorScheme="teal" marginTop="8px" type="submit">
              Sign In
            </Button>
          </FormControl>
        </form>
        <Flex justifyContent="space-between">
          <Text>
            Not registered yet?{" "}
            <ChakraLink color="blue.300" as={Link} to="/sign-up">
              {" "}
              Sign Up
            </ChakraLink>
          </Text>
          <Image
            width="40px"
            alt="clef-icon"
            src={require("../assets/treble-clef-red-icon.png")}
          />
        </Flex>
      </Box>
    </Center>
  );
}

export default SignIn;
