import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { useTheme } from "react-native-paper";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";

const JobOfferScreen = ({ route }) => {
  const { jobId } = route.params;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobDocRef = doc(db, 'jobs', jobId);
        const jobDocSnapshot = await getDoc(jobDocRef);

        if (jobDocSnapshot.exists()) {
          const jobData = jobDocSnapshot.data();
          const offersWithUserNames = await Promise.all(
            jobData.offers.map(async (offer) => {
              const userData = await getUserData(offer.userId);
              return {
                ...offer,
                userName: userData.name,
              };
            })
          );
          setOffers(offersWithUserNames || []);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const getUserData = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    return null;
  };

  const handleAccept = (userId) => {
    console.log(`Accepted offer from user ${userId}`);
  };

  const handleDecline = (userId) => {
    console.log(`Declined offer from user ${userId}`);
  };

  const renderOfferItem = ({ item }) => (
    <View style={styles.offerItem}>
      <View style={styles.offerHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.timestamp}>{item.timestamp.toDate().toLocaleString()}</Text>
      </View>
      <Text style={styles.offerText}>{item.text}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAccept(item.userId)}
          >
            <Text style={styles.buttonLabel}>Accept</Text>
            <FontAwesome name="check" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleDecline(item.userId)}
          >
            <Text style={styles.buttonLabel}>Decline</Text>
            <FontAwesome name="times" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/texture.jpg")} style={styles.image}>
        <FlatList
          data={offers}
          keyExtractor={(item, index) => (item.id ? `${item.id}-${index}` : index.toString())}
          renderItem={renderOfferItem}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  offerItem: {
    backgroundColor: "#ffff",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  offerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  offerText: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "white",
    marginRight: 5,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  declineButton: {
    backgroundColor: "red",
  },
});

export default JobOfferScreen;
