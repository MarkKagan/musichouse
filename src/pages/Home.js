import { Link } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { database } from "../firebase";
import { useState, useEffect } from "react";
import { ref as databaseRef, child, get } from "firebase/database";

import {
  Button,
  Box,
  Link as ChakraLink,
  Text,
  Center,
} from "@chakra-ui/react";

function Home() {
  const { user } = useUserAuth();
  const [signedInUser, setSignedInUser] = useState({});
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const usersRef = databaseRef(database);
        const allUsers = await get(child(usersRef, "/"));
        if (allUsers.exists()) {
          const me = Object.fromEntries(
            Object.entries(allUsers.val()).filter(([key, val]) => {
              return user.uid === key;
            })
          );
          setSignedInUser(me);
        }
        if (!signedInUser) return;
        else {
          if (
            signedInUser[user.uid]["musician"] &&
            signedInUser[user.uid]["musician"].active
          ) {
            setAccounts({ musician: true });
          }
          if (
            signedInUser[user.uid]["host"] &&
            signedInUser[user.uid]["host"].active
          ) {
            setAccounts({ host: true });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    unsubscribe();

    return () => {
      unsubscribe();
    };
  }, [signedInUser]);

  const { setActiveAs } = useUserAuth();

  const loginAsMusician = () => {
    setActiveAs("musician");
  };
  const loginAsHost = () => {
    setActiveAs("host");
  };

  return (
    <Center marginTop="40px">
      <Box
        width="60%"
        p={4}
        borderWidth="3px"
        borderRadius="20px"
        borderColor="blue.100"
        alignSelf="center"
      >
        <Text>
          Welcome to Music House! Here things are simple. We love classical
          music and want to create a space to help musicians and hosts find each
          other. For details please click{" "}
          <ChakraLink as={Link} to="/explanation">
            <Text color="blue.400" as="i">
              here
            </Text>
          </ChakraLink>
          .
        </Text>
        <br />
        <Text>
          The first step is to register as either a musician or ensemble, or a
          host. If you are interested in both, you will be able to add another
          profile later.
        </Text>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Box margin="20px">
            <ChakraLink
              style={{ textDecoration: "none" }}
              as={Link}
              to="/landing-page"
              onClick={loginAsMusician}
            >
              <Button disabled={!accounts.musician} colorScheme="yellow">
                Enter as a musician
              </Button>
            </ChakraLink>

            {!accounts.musician && (
              <Text fontSize="sm" display="flex" justifyContent="center">
                <ChakraLink color="blue.400" as={Link} to="/musician-form">
                  Register as a musician
                </ChakraLink>
              </Text>
            )}
          </Box>

          <Box margin="20px">
            <ChakraLink
              style={{ textDecoration: "none" }}
              as={Link}
              to="/landing-page"
              onClick={loginAsHost}
            >
              <Button disabled={!accounts.host} colorScheme="blue">
                Enter as a host
              </Button>
            </ChakraLink>
            {!accounts.host && (
              <Text fontSize="sm" display="flex" justifyContent="center">
                <ChakraLink color="blue.400" as={Link} to="/host-form">
                  <span>Register as a host</span>
                </ChakraLink>
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Center>
  );
}

export default Home;
