import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const PatientPrivacyScreen = () => {
    const LocalImage = require("../../assets/texture.jpg")
  return (
    <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </Text>

          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about our Privacy Policy, please contact us at privacy@example.com.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", 
    padding: 20,
  },
  content: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
});

export default PatientPrivacyScreen;
