// import LogoutButton from "../logging-in/LogoutButton";
// import { NavLink } from "react-router-dom";
// import { useUserAuth } from "../firebase/UserAuthContext";
// import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
// import AccountToggleButton from "../logging-in/AccountToggleButton";
// // import ProfileDropDown from "../components/ProfileDropDown";

// function LandingPage() {
//   const { activeAs } = useUserAuth();

//   const searchType = activeAs === "musician" ? "host" : "musician";

//   const {searchableUsers, signedInUser} = useFilteredUsersContext();

//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             {/* <ProfileDropDown /> */}
//             <NavLink to="/personal-profile">Profile</NavLink>
//           </li>
//           <li>
//             <NavLink to="/search">{`Search for ${searchType}s`}</NavLink>
//           </li>
//           <li>
//             <NavLink to="/favorites">Favorites</NavLink>
//           </li>
//           <li>
//             <LogoutButton />
//           </li>
//           <li>
//             <AccountToggleButton />
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default LandingPage;



import { ReactNode, useEffect } from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";


import {useState} from 'react';
import LogoutButton from "../logging-in/LogoutButton";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";
import AccountToggleButton from "../logging-in/AccountToggleButton";


const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("yellow.100", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Simple() {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [hasTwoAccounts, setHasTwoAccounts] = useState();
  
  const { user, activeAs } = useUserAuth();
  const id = user.uid;
  const searchType = activeAs === "musician" ? "host" : "musician";
  const { signedInUser } = useFilteredUsersContext();

  useEffect(() => {
    if (!signedInUser[id]) return;
    const toBeSetUrl = signedInUser[id] && signedInUser[id][activeAs] ? signedInUser[id][activeAs].pictureUrl : '';
    setProfilePicUrl(toBeSetUrl);
    const userHasTwoAccounts = signedInUser[id][searchType].active === true;
    setHasTwoAccounts(userHasTwoAccounts);
  }, [signedInUser]) //useEffect here because by the time this comp. renders, signedInUser is not available

  
  const Links = [`Search for ${searchType}s`, "Favorites"];

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Box bg={useColorModeValue("blue.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={profilePicUrl} />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                {hasTwoAccounts && <MenuItem>
                  <AccountToggleButton />
                </MenuItem>}
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

      <Box p={4}>Main Content Here</Box>
    </>
  );
}