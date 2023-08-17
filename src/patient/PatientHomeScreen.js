import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"; 
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const PatientHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);

  const navigation = useNavigation();

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
        console.log(doc.id)
        servicesData.push({
          ...doc.data(),
          id:doc.id,
        });
        console.log({
          ...doc.data(),
          id:doc.id,
        })
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
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ServiceDetailScreen", { service: item})} 
      style={styles.serviceContainer}
    >
      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
      <Text>Category: {item.category}</Text>
    </TouchableOpacity>
  );

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
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} 
        style={styles.contentContainerStyle}
      />
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
    justifyContent: "center",
  },
  contentContainerStyle: {
    paddingBottom: 20
  }, 
});

export default PatientHomeScreen;
