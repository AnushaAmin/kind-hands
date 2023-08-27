import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const PatientServiceDetailScreen = ({ route }) => {
  const { service } = route.params;
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const creatorDocRef = doc(db, "users", service.user_id);
        const creatorDocSnapshot = await getDoc(creatorDocRef);

        if (creatorDocSnapshot.exists()) {
          setCreator(creatorDocSnapshot.data());
        } else {
          console.log("Creator not found");
        }
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreator();
  }, [service]);

  if (!service) {
    return <Text>No service data available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceCategory}>Category: {service.category}</Text>
      </View>
      <View style={styles.serviceContent}>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        {creator && (
          <View style={styles.creatorContainer}>
            <Text style={styles.creatorTitle}>Created By:</Text>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorTitle}>Gender:</Text>
            <Text style={styles.creatorName}>{creator.gender}</Text>
            <Text style={styles.creatorTitle}>Email:</Text>
            <Text style={styles.creatorEmail}>{creator.email}</Text>
            <Text style={styles.creatorTitle}>Address:</Text>
            <Text style={styles.creatorName}>{creator.address}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  serviceHeader: {
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  serviceCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  serviceContent: {},
  serviceDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  creatorContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: "#ddd",
  },
  creatorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  creatorName: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  creatorEmail: {
    fontSize: 16,
    color: "#0066CC",
  },
});

export default PatientServiceDetailScreen;
