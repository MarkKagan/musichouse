import { storage } from "../firebase/index";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../firebase/index";
import { ref as databaseRef, update } from "firebase/database";
import { useState, useEffect } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";

import {
  Button,
  Box,
  Input,
  Image,
  HStack
} from "@chakra-ui/react";

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
    <Box>
      <Box boxSize="auto" margin="10px">
        <Image
          src={profilePicURL}
          alt="profile"
          borderRadius="15px"
          maxWidth="150px"
          maxHeight="150px"
        />
      </Box>
      <HStack>
        <Input placeholder="Select File" type="file" onChange={onFileSelect} />

        <Button
          colorScheme="teal"
          alignSelf="center"
          marginTop="8px"
          type="submit"
          disabled={!uploadedImage}
          onClick={uploadedImageHandler}
        >
          Upload Picture
        </Button>
      </HStack>
    </Box>
  );
}

export default UploadPicture;
