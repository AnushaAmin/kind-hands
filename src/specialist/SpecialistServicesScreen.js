import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { collection, query as firestoreQuery, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { Card } from "react-native-paper";

const SpecialistServicesScreen = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const isFocused = useIsFocused();

  const fetchServices = async () => {
    try {
      const userServicesCollectionRef = collection(
        db,
        "services",
        auth.currentUser.uid,
        "all-services"
      );
      const q = firestoreQuery(userServicesCollectionRef);

      const querySnapshot = await getDocs(q);

      const fetchedServices = [];
      querySnapshot.forEach((doc) => {
        fetchedServices.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchServices();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => {
              navigation.navigate("EditServiceScreen", { serviceId: item.id });
            }}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.serviceCategory}>
                  Category: {item.category}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("CreateServiceScreen");
        }}
      >
        <FontAwesome name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serviceItem: {
    padding: 15,
  },
  card: {
    elevation: 3,
    borderRadius: 10,
    
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 16,
    color: "gray",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgb(0, 95, 175)",
    borderRadius: 25,
    padding: 10,
  },
});

export default SpecialistServicesScreen;
