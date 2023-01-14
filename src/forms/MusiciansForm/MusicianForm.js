import UploadPicture from "../UploadPicture";
import { useUserAuth } from "../../firebase/UserAuthContext";
import { useState } from "react";
import { update, ref as databaseRef } from "firebase/database";
import { database } from "../../firebase/index";
import getCoordinates from "../../getCoordinates";
import { useNavigate } from "react-router-dom";

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

function MusicianForm() {
  const userType = "musician";
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const [musicianInputState, setMusicianInputState] = useState({});

  const firstNameChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, firstName: e.target.value });
  };
  const lastNameChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, lastName: e.target.value });
  };
  const countryChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, country: e.target.value });
  };
  const cityChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, city: e.target.value });
  };
  const streetChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, street: e.target.value });
  };
  const houseNumberChangeHandler = (e) => {
    setMusicianInputState({
      ...musicianInputState,
      houseNumber: e.target.value,
    });
  };
  const postalCodeChangeHandler = (e) => {
    setMusicianInputState({
      ...musicianInputState,
      postalCode: e.target.value,
    });
  };
  const emailChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, email: e.target.value });
  };
  const phoneChangeHandler = (e) => {
    setMusicianInputState({ ...musicianInputState, phone: e.target.value });
  };
  const descriptionChangeHandler = (e) => {
    setMusicianInputState({
      ...musicianInputState,
      description: e.target.value,
    });
  };

  const submitMusicianForm = async (e) => {
    e.preventDefault();
    const activatedMusicianInfo = { ...musicianInputState, active: true };
    //send info to database
    const musicianInputDatabaseRef = databaseRef(
      database,
      `${user.uid}/${userType}`
    );
    try {
      await update(musicianInputDatabaseRef, activatedMusicianInfo);
      console.log("SUCCESS - host form submitted!");
    } catch (error) {
      console.log("ERROR submitting musician form: ", error);
    }

    //make api call to fetch the coordinates of address and add those to the database
    try {
      const coordinates = await getCoordinates({
        country: musicianInputState.country,
        city: musicianInputState.city,
        street: musicianInputState.street,
        houseNumber: musicianInputState.houseNumber,
        postalCode: musicianInputState.postalCode,
      });
      console.log("coordinates: ", coordinates);
      await update(musicianInputDatabaseRef, { coordinates: coordinates });
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
          Become a musician with Music House!
        </Heading>

        <UploadPicture userType={userType} />
        <form type="submit" id="musician-form" onSubmit={submitMusicianForm}>
          <FormControl>
            <FormLabel htmlFor="musician-first-name">First Name: </FormLabel>
            <Input
              required
              type="text"
              id="musician-first-name"
              onChange={firstNameChangeHandler}
            />

            <FormLabel htmlFor="musician-last-name">Last Name: </FormLabel>
            <Input
              required
              type="text"
              id="musician-last-name"
              onChange={lastNameChangeHandler}
            />

            <FormLabel htmlFor="musician-country">Country: </FormLabel>
            <Input
              required
              type="text"
              id="musician-country"
              onChange={countryChangeHandler}
            />

            <FormLabel htmlFor="musician-city">City: </FormLabel>
            <Input
              required
              type="text"
              id="musician-city"
              onChange={cityChangeHandler}
            />

            <FormLabel htmlFor="musician-street">Street: </FormLabel>
            <Input
              required
              type="text"
              id="musician-street"
              onChange={streetChangeHandler}
            />

            <FormLabel htmlFor="musician-house-number">
              House number:{" "}
            </FormLabel>
            <Input
              required
              type="text"
              id="musician-house-number"
              onChange={houseNumberChangeHandler}
            />

            <FormLabel htmlFor="musician-postal-code">Postal Code: </FormLabel>
            <Input
              required
              type="text"
              id="musician-postal-code"
              onChange={postalCodeChangeHandler}
            />

            <FormLabel htmlFor="musician-email">Email: </FormLabel>
            <Input
              required
              type="email"
              id="musician-email"
              onChange={emailChangeHandler}
            />

            <FormLabel htmlFor="musician-phone">
              Phone Number (optional):{" "}
            </FormLabel>
            <Input
              type="tel"
              id="musician-phone"
              onChange={phoneChangeHandler}
            />

            <FormLabel htmlFor="musician-description">
              Write a few words about yourself as a musician and individual.
              Perhaps what repertoire you like to play, and what you seek from
              this musical and social interaction.
            </FormLabel>
            <Textarea
              form="musician-form"
              type="textarea"
              id="musician-description"
              onChange={descriptionChangeHandler}
            />
            <Box display="flex" justifyContent="center">
              <Button
                colorScheme="teal"
                alignSelf="center"
                marginTop="8px"
                type="submit"
              >
                Submit Musician Form
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}

export default MusicianForm;
