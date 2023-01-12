import UploadPicture from "../UploadPicture";
import { useUserAuth } from "../../firebase/UserAuthContext";
import { useState } from "react";
import { update, ref as databaseRef } from "firebase/database";
import { database } from "../../firebase/index";
import getCoordinates from "../../getCoordinates";
import { useNavigate } from "react-router-dom";

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
      console.log('coordinates: ', coordinates);
      await update(musicianInputDatabaseRef, { coordinates: coordinates })
    } catch (error) {
      console.log("ERROR updating user input: ", error);
    }
    navigate("/home");
  };

  return (
    <div>
      <UploadPicture userType={userType} />
      <form type="submit" id="musician-form" onSubmit={submitMusicianForm}>
        <label htmlFor="musician-first-name">First Name: </label>
        <input
          required
          type="text"
          id="musician-first-name"
          onChange={firstNameChangeHandler}
        />

        <label htmlFor="musician-last-name">Last Name: </label>
        <input
          required
          type="text"
          id="musician-last-name"
          onChange={lastNameChangeHandler}
        />

        <label htmlFor="musician-country">Country: </label>
        <input
          required
          type="text"
          id="musician-country"
          onChange={countryChangeHandler}
        />

        <label htmlFor="musician-city">City: </label>
        <input
          required
          type="text"
          id="musician-city"
          onChange={cityChangeHandler}
        />

        <label htmlFor="musician-street">Street: </label>
        <input
          required
          type="text"
          id="musician-street"
          onChange={streetChangeHandler}
        />

        <label htmlFor="musician-house-number">House number: </label>
        <input
          required
          type="text"
          id="musician-house-number"
          onChange={houseNumberChangeHandler}
        />

        <label htmlFor="musician-postal-code">Postal Code: </label>
        <input
          required
          type="text"
          id="musician-postal-code"
          onChange={postalCodeChangeHandler}
        />

        <label htmlFor="musician-email">Email: </label>
        <input
          required
          type="email"
          id="musician-email"
          onChange={emailChangeHandler}
        />

        <label htmlFor="musician-phone">Phone Number (optional): </label>
        <input type="tel" id="musician-phone" onChange={phoneChangeHandler} />

        <label htmlFor="musician-description">
          Write a few words about yourself as a musician and individual. Perhaps
          what repertoire you like to play, and what you seek from this musical
          and social interaction.
        </label>
        <textarea
          form="musician-form"
          type="textarea"
          id="musician-description"
          onChange={descriptionChangeHandler}
        />
        <button type="submit">Become a Music House musician!</button>
      </form>
    </div>
  );
}

export default MusicianForm;
