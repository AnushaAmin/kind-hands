import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import app from "../../config/firebaseConfig";

const auth = getAuth(app);
const LocalImage = require("../../assets/texture.jpg")

const PatientSettingScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
        <Button
          style={styles.button}
          mode="contained"
          labelStyle={styles.buttonLabel} 
          onPress={() => signOut(auth)}
        >
          Logout
        </Button>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: "20%",
    width: "50%",
    justifyContent: "center",
    backgroundColor: '#CEECF0',
  },
  buttonLabel: {
    color: 'black', 
  },
  image: {
    flex: 1,
  },
});

export default PatientSettingScreen;
