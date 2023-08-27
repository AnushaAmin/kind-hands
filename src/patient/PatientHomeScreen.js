import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"; 
import { Button, Card } from "react-native-paper"; 
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
        servicesData.push({
          ...doc.data(),
          id: doc.id,
        });
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
      onPress={() => navigation.navigate("ServiceDetailScreen", { service: item })} 
      style={styles.serviceContainer}
    >
      <Card style={styles.cardContainer}> 
        <Card.Content>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text>Category: {item.category}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}  
      >
        <Picker.Item label="Select a category" value="" />
        {Categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      </View>
      <View style={styles.buttonContainer}> 
        <Button onPress={handleSearch} style={styles.button} mode="contained">
          Search
        </Button>
      </View>
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
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    overflow: "hidden", 
    
  },
  picker: {
    height: 45,  
    
  },
  serviceContainer: {
    marginBottom: 15,
  },
  cardContainer: {
    elevation: 3,
    borderRadius: 10,
  },
  serviceName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: "center", 
  },
  button: {
    marginBottom: 10,
    width: 100,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  }, 
});

export default PatientHomeScreen;
