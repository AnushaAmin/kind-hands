import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import app from "../../config/firebaseConfig";

const auth = getAuth(app);
const LocalImage = require("../../assets/texture.jpg");

const PatientSettingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            labelStyle={styles.buttonLabel} 
            onPress={() => navigation.navigate("PatientPrivacyScreen")}
          >
            Privacy
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            labelStyle={styles.buttonLabel} 
            onPress={() => navigation.navigate("PatientAboutScreen")}
          >
            About
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            labelStyle={styles.buttonLabel} 
            onPress={() => navigation.navigate("PatientDisclaimerScreen")}
          >
            Disclaimer
          </Button>
          <Button
            style={[styles.button, styles.logoutButton]}
            mode="contained"
            labelStyle={styles.buttonLabel} 
            onPress={() => signOut(auth)}
          >
            Logout
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: 'rgb(0, 95, 175)',
  },
  logoutButton: {
    backgroundColor: 'red', 
  },
  buttonLabel: {
    color: 'white', 
  },
  image: {
    flex: 1,
  },
});

export default PatientSettingScreen;
