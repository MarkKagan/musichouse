import UploadPicture from "../UploadPicture";
import { useState } from "react";
import { update, ref as databaseRef } from "firebase/database";
import { database } from "../../firebase/index";
import { useUserAuth } from "../../firebase/UserAuthContext";
import getCoordinates from "../../getCoordinates";

function HostForm() {
  const userType = "host";
  const { user } = useUserAuth();

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
      `users/${user.uid}/${userType}`
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
      console.log('coordinates: ', coordinates);
      await update(hostInputDatabaseRef, { coordinates: coordinates })
    } catch (error) {
      console.log("ERROR updating user input: ", error);
    }
  };

  return (
    <div>
      <UploadPicture userType={userType} />
      <form type="submit" id="host-form" onSubmit={submitHostForm}>
        <label htmlFor="host-first-name">First Name: </label>
        <input
          required
          type="text"
          id="host-first-name"
          onChange={firstNameChangeHandler}
        />

        <label htmlFor="host-last-name">Last Name: </label>
        <input
          required
          type="text"
          id="host-last-name"
          onChange={lastNameChangeHandler}
        />

        <label htmlFor="host-country">Country: </label>
        <input
          required
          type="text"
          id="host-country"
          onChange={countryChangeHandler}
        />

        <label htmlFor="host-city">City: </label>
        <input
          required
          type="text"
          id="host-city"
          onChange={cityChangeHandler}
        />

        <label htmlFor="host-street">Street: </label>
        <input
          required
          type="text"
          id="host-street"
          onChange={streetChangeHandler}
        />

        <label htmlFor="street">House number: </label>
        <input
          required
          type="text"
          id="host-house-number"
          onChange={houseNumberChangeHandler}
        />

        <label htmlFor="host-postal-code">Postal Code: </label>
        <input
          required
          type="text"
          id="host-postal-code"
          onChange={postalCodeChangeHandler}
        />

        <label htmlFor="host-email">Email: </label>
        <input
          required
          type="email"
          id="host-email"
          onChange={emailChangeHandler}
        />

        <label htmlFor="host-phone">Phone Number (optional): </label>
        <input type="tel" id="host-phone" onChange={phoneChangeHandler} />

        <label htmlFor="host-description">
          Please briefly introduce yourself and tell us why you are interested
          to host classical music socials.
        </label>
        <textarea
          form="host-form"
          type="textarea"
          id="host-description"
          onChange={descriptionChangeHandler}
        />
        <button type="submit">Become a Music House host!</button>
      </form>
    </div>
  );
}

export default HostForm;
