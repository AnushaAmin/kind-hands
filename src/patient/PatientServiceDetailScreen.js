import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

const PatientServiceDetailScreen = ({ route }) => {
  const { service } = route.params;
  const [creator, setCreator] = useState(null);
  const [isVerified, setIsVerified] = useState(true);

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
      <View style={styles.card}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
        <View style={styles.creatorContainer}>
          {creator && (
            <View>
              <View style={styles.creatorInfo}>
                <Text style={[styles.creatorTitle, styles.topMargin]}>Name:</Text>
                <Text style={[styles.creatorName, styles.topMargin]}>{creator.name}</Text>
              </View>
              <View style={styles.creatorInfo}>
                <Text style={styles.creatorTitle}>Gender:</Text>
                <Text style={styles.creatorName}>{creator.gender}</Text>
              </View>
              {creator.experience && (
                <View style={styles.creatorInfo}>
                  <Text style={styles.creatorTitle}>Experience:</Text>
                  <Text style={styles.creatorName}>{creator.experience}</Text>
                </View>
              )}
              <View style={styles.creatorInfo}>
                <Text style={styles.creatorTitle}>Email:</Text>
                <Text style={styles.creatorEmail}>{creator.email}</Text>
              </View>
              <View style={styles.creatorInfo}>
                <Text style={styles.creatorTitle}>Address:</Text>
                <Text style={styles.creatorName}>{creator.address}</Text>
              </View>
              {isVerified && (
                <View style={styles.verifiedContainer}>
                  <Icon name="check-circle" size={20} color="rgb(0, 95, 175)" />
                  <Text style={styles.verifiedText}>Verified Service Provider</Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={styles.middleLine}></View>
        <View style={styles.serviceContent}>
          <Text style={[styles.serviceCategory, styles.boldText]}>Category: {service.category}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: "relative", 
  },
  contactButton: {
    position: "absolute", 
    top: 30, 
    right: 20, 
    backgroundColor: "rgb(0, 95, 175)",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  creatorContainer: {
    flexDirection: "column",
    marginBottom: 20,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: "#ddd",
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  topMargin: {
    marginTop: 8,
  },
  creatorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  creatorName: {
    fontSize: 16,
    color: "#555",
  },
  creatorEmail: {
    fontSize: 16,
    color: "#0066CC",
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 16,
    color: "rgb(0, 95, 175)",
    marginLeft: 5,
  },
  middleLine: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginVertical: 15,
  },
  serviceContent: {
    marginTop: 20,
  },
  serviceCategory: {
    fontSize: 18,
    color: "#333",
  },
  serviceDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginTop: 10
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default PatientServiceDetailScreen;
