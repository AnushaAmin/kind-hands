import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const PatientDisclaimerScreen = () => {
  const LocalImage = require("../../assets/texture.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Disclaimer</Text>
          <Text style={styles.paragraph}>
            The information provided on this app/website is for general informational purposes only. We do not provide medical, legal, or financial advice.
          </Text>

          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about our Disclaimer, please contact us at legal@example.com.
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    
    padding: 20,
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

export default PatientDisclaimerScreen;
