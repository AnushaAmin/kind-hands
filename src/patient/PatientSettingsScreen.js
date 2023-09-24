import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import app from "../../config/firebaseConfig";

const auth = getAuth(app);
const LocalImage = require("../../assets/texture.jpg")

const PatientSettingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
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
    marginLeft: "20%",
    marginTop:"10%",
    width: "50%",
    justifyContent: "center",
    backgroundColor: 'rgb(0, 95, 175)',
  },
  buttonLabel: {
    color: 'white', 
  },
  image: {
    flex: 1,
  },
});

export default PatientSettingScreen;
