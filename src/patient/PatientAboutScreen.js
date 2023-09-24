import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const PatientAboutScreen = () => {
  const LocalImage = require("../../assets/texture.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>About Us</Text>
          <Text style={styles.paragraph}>
            Welcome to our app! We are dedicated to providing you with the best services and solutions.
          </Text>

          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.paragraph}>
            Our mission is to simplify your life and make it more enjoyable. We strive to offer top-notch products and services that meet your needs.
          </Text>

          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or feedback, please don't hesitate to contact us at support@example.com.
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  content: {
    flexGrow: 1,
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

export default PatientAboutScreen;
