import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";
import { collectionGroup, getDocs, query } from "firebase/firestore";

const PatientHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);

  const handleSearch = async () => {
    if (!selectedCategory) {
      alert("Select a category");
      return;
    }

    try {
      const q = query(collectionGroup(db, "all-services"));
      const querySnapshot = await getDocs(q);

      const servicesData = [];
      querySnapshot.forEach((doc) => {
        servicesData.push(doc.data());
      });

      const filteredServices = servicesData.filter(
        (service) => service.category === selectedCategory
      );

      setServices(filteredServices);
      if (filteredServices.length === 0) {
        alert("No service found for this category.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Select a category" value="" />
        {Categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <Button onPress={handleSearch} style={styles.button}>
        <Text>Search</Text>
      </Button>
      {services.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <Text style={{ fontWeight: "bold" }}>Name: {service.name}</Text>
          <Text>Category: {service.category}</Text>
          <Text>Description: {service.description}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  serviceContainer: {
    marginLeft: 20, 
    marginTop: 15, 
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
  }
});

export default PatientHomeScreen;
