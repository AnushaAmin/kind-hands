import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { ActivityIndicator, Card, Paragraph } from "react-native-paper";

const PatientJobScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      // Get the currently logged-in user's ID
      const currentUserID = auth.currentUser?.uid;

      // Only fetch jobs created by the current user
      const jobsCollectionRef = collection(db, "jobs");
      const jobsQuery = query(jobsCollectionRef, where("user_id", "==", currentUserID));

      const querySnapshot = await getDocs(jobsQuery);

      const fetchedJobs = [];
      querySnapshot.forEach((doc) => {
        fetchedJobs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setJobs(fetchedJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ImageBackground source={require("../../assets/texture.jpg")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 10 }} animating={loading} />
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => {
                navigation.navigate('EditJobScreen', { job: item });
              }}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.jobTitle}>Service Required: {item.serviceRequired}</Text>
                  <Paragraph>Description: {item.description}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("CreateJobsScreen");
          }}
        >
          <FontAwesome name="plus" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  jobItem: {
    marginBottom: 15,
  },
  card: {
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "white",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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

export default PatientJobScreen;
