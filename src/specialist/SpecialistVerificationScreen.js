import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Alert, Image, ImageBackground } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

const SpecialistVerificationScreen = () => {
  const [picture, setPicture] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const uploadImage = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network Request Failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "verification/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPicture(downloadURL);
          });
        }
      );
    };
    if (image != null) {
      uploadImage();
      setImage(null);
    }
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
    }
  };

  const handleUpload = async () => {
    if (picture) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const updatedData = {
        uploadedDocument: picture,
      };

      try {
        await updateDoc(userDocRef, updatedData);
        Alert.alert(
          "Upload Successful",
          "Your document has been uploaded successfully."
        );
      } catch (error) {
        console.error("Error updating document: ", error);
      }
      setUploadProgress(0);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/texture.jpg")} // Adjust the path based on your image
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {picture && (
          <Image source={{ uri: picture }} style={styles.previewImage} />
        )}
        <Button style={styles.button} onPress={pickImage}>
          Pick an Image
        </Button>
        {uploadProgress > 0 && (
          <ProgressBar progress={uploadProgress / 100} color="#6200ee" />
        )}
        <Button
          style={styles.button}
          disabled={!picture || uploadProgress !== 100}
          onPress={handleUpload}
        >
          Upload
        </Button>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  button: {
    marginTop: 50,
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
    marginLeft: 70,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default SpecialistVerificationScreen;
