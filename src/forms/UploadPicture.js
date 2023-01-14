//some error is preventing the fetching of profile_pictures!
//prefix reference vs. item reference in the returned object

import { storage } from "../firebase/index";
import {
  ref as storageRef,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../firebase/index";
import { ref as databaseRef, update } from "firebase/database";
import { useState, useEffect } from "react";
// import { v4 } from "uuid";
import { useUserAuth } from "../firebase/UserAuthContext";

function UploadPicture({ userType }) {
  const defaultAvatar = require("../assets/default_avatar.png");

  const [uploadedImage, setUploadedImage] = useState(null); //for selecting file to upload
  const [profilePicURL, setProfilePicURL] = useState(defaultAvatar); //for setting user profile pic
  // const [imagesListURLs, setImagesListURLs] = useState([]); //for extracting all of the pic url's in storage

  const { user } = useUserAuth();

  const uploadedImageHandler = () => {
    //upload picture to storage
    if (!user) return;
    if (uploadedImage == null) return;
    const storageImageRef = storageRef(
      storage,
      `profile_pictures/${user.uid}/${userType}`
    );
    uploadBytes(storageImageRef, uploadedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfilePicURL(url);

          //write the profile_pic_url under the user_uid in database
          const databaseImageRef = databaseRef(
            database,
            `${user.uid}/${userType}`
          );
          const profilePicture = {
            pictureUrl: url,
          };
          update(databaseImageRef, profilePicture)
            .then(() => {
              console.log("SUCCESS - profile picture uploaded!");
            })
            .catch((error) => {
              console.log("ERROR uploading profile pic: ", error);
            });
        });
        alert("Image uploaded");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onFileSelect = (event) => {
    event.preventDefault();
    setUploadedImage(event.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={onFileSelect} />
      <button disabled={!uploadedImage} onClick={uploadedImageHandler}>
        Upload Picture
      </button>

      <img className="profile_pic" alt="profile" src={profilePicURL} />
    </>
  );
}

export default UploadPicture;
