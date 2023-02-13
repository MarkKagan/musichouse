import { useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import LogoutButton from "../logging-in/LogoutButton";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import AccountToggleButton from "../logging-in/AccountToggleButton";
import { useNavigate, NavLink as ReactNavLink } from "react-router-dom";

const NavLink = ({ to, children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("yellow.100", "gray.700"),
    }}
    as={ReactNavLink}
    to={to}
  >
    {children}
  </Link>
);

export default function Navigation() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [hasTwoAccounts, setHasTwoAccounts] = useState();

  const navigate = useNavigate();

  const { user, activeAs, logOut: signOff } = useUserAuth();
  const id = user.uid;
  const searchType = activeAs === "musician" ? "host" : "musician";
  const { signedInUser } = useFilteredUsersContext();

  useEffect(() => {
    if (!signedInUser[id]) return;

    const toBeSetUrl =
      signedInUser[id] && signedInUser[id][activeAs]
        ? signedInUser[id][activeAs].pictureUrl
        : "";
    setProfilePicUrl(toBeSetUrl);
    const userHasTwoAccounts = signedInUser[id][searchType].active === true;
    setHasTwoAccounts(userHasTwoAccounts);
  }, [id, activeAs, signedInUser, searchType]); //useEffect here because by the time this comp. renders, signedInUser is not available

  // const logOut = () => { //figure out how to 'nest buttons' (it's not allowed)
  //   signOff();
  //   navigate("/sign-in");
  // };

  const Links = [`Search for ${searchType}s`, "Favorites"];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box height="-webkit-fit-content" backgroundColor="#FEFCBF">
      <Box
        bg={useColorModeValue("blue.100", "gray.900")}
        px={4}
        borderBottomLeftRadius="20px"
        borderBottomRightRadius="20px"
        // position="relative"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image
              width="40px"
              alt="clef-icon"
              src={require("../assets/treble-clef-red-icon.png")}
            />

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <NavLink to="/search">{`Search for ${searchType}s`}</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
              <NavLink to="/welcome-page">News</NavLink>
            </HStack>
          </HStack>

          <Heading
            fontStyle="oblique"
            textColor="#FF4651"
            position="absolute"
            left="50%"
            style={{
              transform: "translateX(-50%)",
            }}
          >
            Music House
          </Heading>

          <Flex alignItems={"center"} zIndex="10000">
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar width="40px" height="40px" src={profilePicUrl} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/personal-profile");
                  }}
                >
                  My Profile
                </MenuItem>
                <MenuDivider />
                {hasTwoAccounts && (
                  <MenuItem>
                    <AccountToggleButton />
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem>
                  <LogoutButton />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
