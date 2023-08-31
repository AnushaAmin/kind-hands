import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import { db } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const PatientHomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      if (!selectedCategory) {
        Alert.alert("Select a category");
        return;
      }

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

  useEffect(() => {
    if (selectedCategory) {
      handleSearch();
    }
  }, [selectedCategory]);

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      onPress={() => {setSelectedCategory(category);
        setSearchQuery(category);
      }}
      style={[
        styles.categoryItem,
        selectedCategory === category && styles.selectedCategoryItem,
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search category..."
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />
      <Text style={styles.heading}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {Categories.map((category) => renderCategory(category))}
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ServiceDetailScreen", { service: item })
            }
            style={styles.serviceContainer}
          >
            <Card style={styles.cardContainer}>
              <Card.Content>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text>Category: {item.category}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
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
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryItem: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E6E7E5",
  },
  selectedCategoryItem: {
    backgroundColor: "#ddd",
  },
  categoryText: {
    color: "black",
  },
  selectedCategoryText: {
    color: "black",
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
  contentContainerStyle: {
    paddingBottom: 20,
  },
  searchBar: {
    borderRadius: 10, 
    marginBottom: 10,
  },
});

export default PatientHomeScreen;
