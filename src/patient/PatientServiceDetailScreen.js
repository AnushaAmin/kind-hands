import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { db } from "../../config/firebaseConfig";
import { doc, getDocs, getDoc, query, collectionGroup } from "firebase/firestore";

const PatientServiceDetailScreen = ({ route }) => {
  const { service } = route.params;
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const creatorDocRef = doc(db, "services", "ruLk32xRmDZPIyhe8TCX5KD81Ho1"); 
        const creatorDocSnapshot = await getDoc(creatorDocRef);
        
        console.log(creatorDocSnapshot.ref.parent)
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
            <Text style={styles.creatorTitle}>Author/Creator:</Text>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorSubtitle}>Email Address:</Text>
            <Text style={styles.creatorEmail}>{creator.email}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  serviceHeader: {
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  serviceCategory: {
    fontSize: 16,
    color: "#666",
  },
  serviceContent: {
    marginBottom: 20,
  },
  serviceDescription: {
    fontSize: 16,
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
  },
  creatorName: {
    fontSize: 16,
  },
  creatorSubtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  creatorEmail: {
    fontSize: 16,
    color: "#0066CC",
  },
});

export default PatientServiceDetailScreen;
