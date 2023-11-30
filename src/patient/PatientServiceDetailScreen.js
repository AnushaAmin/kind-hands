import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc, collection, addDoc, getDocs, query, where, and } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from "../../config/firebaseConfig";

const PatientServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [creator, setCreator] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCreator = async () => {
      try {
        const creatorDocRef = doc(db, "users", service.user_id);
        const creatorDocSnapshot = await getDoc(creatorDocRef);

        if (creatorDocSnapshot.exists()) {
          setCreator(creatorDocSnapshot.data());
          setLoading(false);
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

  const createGroup = async () => {
    try {
      const groupRef = await addDoc(collection(db, 'groups'), {
          patientId: auth.currentUser.uid,
          specialistId: service.user_id
      });
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  const handleContactPress = async () => {
    try {
      const groupExists = await getDocs(query(collection(db, 'groups'),
        where("patientId", "==", auth.currentUser.uid),
        where("specialistId", "==", service.user_id)
      ));
      
      if (groupExists.size > 0) {
        const existingGroup = groupExists.docs[0].data();
        navigation.navigate('ChatScreen', { groupId: groupExists.docs[0].id});
      } else {
        const groupId = await createGroup();
        navigation.navigate('ChatScreen', { groupId });
      }
    } catch (error) {
      console.error('Error checking or creating group:', error);
      Alert.alert('Error', 'Unable to start the chat. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/texture.jpg")} style={styles.image}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.contactButton, { zIndex: 1 }]}
              onPress={handleContactPress}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>

            <ActivityIndicator style={{ position: "absolute", alignSelf: "center", top: 25 }} animating={loading} />
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 20,
    paddingBottom: "auto",
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 20,
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
    marginTop: 10,
    textAlign: "justify",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default PatientServiceDetailScreen;
