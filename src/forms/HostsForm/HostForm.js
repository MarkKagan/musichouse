import UploadPicture from "../UploadPicture";
import { useState } from "react";
import { update, ref as databaseRef } from "firebase/database";
import { database } from "../../firebase/index";
import { useUserAuth } from "../../firebase/UserAuthContext";
import getCoordinates from "../../getCoordinates";
import { Form, useNavigate } from "react-router-dom";

import {
  FormControl,
  Button,
  Box,
  Heading,
  Link as ChakraLink,
  FormLabel,
  Input,
  Text,
  Center,
  Textarea,
} from "@chakra-ui/react";

function HostForm() {
  const userType = "host";
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const [hostInputState, setHostInputState] = useState({});

  const firstNameChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, firstName: e.target.value });
  };
  const lastNameChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, lastName: e.target.value });
  };
  const countryChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, country: e.target.value });
  };
  const cityChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, city: e.target.value });
  };
  const streetChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, street: e.target.value });
  };
  const houseNumberChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, houseNumber: e.target.value });
  };
  const postalCodeChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, postalCode: e.target.value });
  };
  const emailChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, email: e.target.value });
  };
  const phoneChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, phone: e.target.value });
  };
  const descriptionChangeHandler = (e) => {
    setHostInputState({ ...hostInputState, description: e.target.value });
  };

  const submitHostForm = async (e) => {
    e.preventDefault();
    const activatedHostInfo = { ...hostInputState, active: true };
    //send info to database
    const hostInputDatabaseRef = databaseRef(
      database,
      `${user.uid}/${userType}`
    );
    try {
      await update(hostInputDatabaseRef, activatedHostInfo);
      console.log("SUCCESS - host form submitted!");
    } catch (error) {
      console.log("ERROR submitting host form: ", error);
    }

    //make api call to fetch the coordinates of address and add those to the database
    try {
      const coordinates = await getCoordinates({
        country: hostInputState.country,
        city: hostInputState.city,
        street: hostInputState.street,
        houseNumber: hostInputState.houseNumber,
        postalCode: hostInputState.postalCode,
      });
      await update(hostInputDatabaseRef, { coordinates: coordinates });
    } catch (error) {
      console.log("ERROR updating user Input: ", error);
    }
    navigate("/home");
  };

  return (
    <Center>
      <Box
        width="50%"
        p={4}
        borderWidth="3px"
        borderRadius="20px"
        borderColor="blue.100"
      >
        <Heading textColor="yellow.300" fontStyle="oblique">
          Become a host with Music House!
        </Heading>
        <UploadPicture userType={userType} />
        <form type="submit" id="host-form" onSubmit={submitHostForm}>
          <FormControl>
            <FormLabel htmlFor="host-first-name">First Name: </FormLabel>
            <Input
              required
              type="text"
              id="host-first-name"
              onChange={firstNameChangeHandler}
            />

            <FormLabel htmlFor="host-last-name">Last Name: </FormLabel>
            <Input
              required
              type="text"
              id="host-last-name"
              onChange={lastNameChangeHandler}
            />

            <FormLabel htmlFor="host-country">Country: </FormLabel>
            <Input
              required
              type="text"
              id="host-country"
              onChange={countryChangeHandler}
            />

            <FormLabel htmlFor="host-city">City: </FormLabel>
            <Input
              required
              type="text"
              id="host-city"
              onChange={cityChangeHandler}
            />

            <FormLabel htmlFor="host-street">Street: </FormLabel>
            <Input
              required
              type="text"
              id="host-street"
              onChange={streetChangeHandler}
            />

            <FormLabel htmlFor="street">House number: </FormLabel>
            <Input
              required
              type="text"
              id="host-house-number"
              onChange={houseNumberChangeHandler}
            />

            <FormLabel htmlFor="host-postal-code">Postal Code: </FormLabel>
            <Input
              required
              type="text"
              id="host-postal-code"
              onChange={postalCodeChangeHandler}
            />

            <FormLabel htmlFor="host-email">Email: </FormLabel>
            <Input
              required
              type="email"
              id="host-email"
              onChange={emailChangeHandler}
            />

            <FormLabel htmlFor="host-phone">
              Phone Number (optional):{" "}
            </FormLabel>
            <Input type="tel" id="host-phone" onChange={phoneChangeHandler} />

            <FormLabel htmlFor="host-description">
              Please briefly introduce yourself and tell us why you are
              interested to host classical music socials.
            </FormLabel>
            <Textarea
              form="host-form"
              type="textarea"
              id="host-description"
              onChange={descriptionChangeHandler}
            />
            <Box display="flex" justifyContent="center">
              <Button
                colorScheme="teal"
                alignSelf="center"
                marginTop="8px"
                type="submit"
              >
                Submit Host Form
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}

export default HostForm;
