import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { useTheme } from "react-native-paper";
import { collection, doc, query, getDocs, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";

const OffersTab = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        const q = query(collection(db, 'jobs'));
        const querySnapshot = await getDocs(q);

        const allOffers = [];
        for (const docRef of querySnapshot.docs) {
          const jobData = docRef.data();
          const jobOffers = jobData.offers || [];

          const offersWithUserNames = await Promise.all(
            jobOffers.map(async (offer) => {
              const userData = await getUserData(offer.userId);
              return {
                ...offer,
                userName: userData?.name || "Unknown User",
                serviceRequired: jobData.serviceRequired,
              };
            })
          );

          allOffers.push(...offersWithUserNames);
        }

        setOffers(allOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOffers();
  }, []);

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
        <Text style={styles.userName}>Name: {item.userName}</Text>
        <Text style={styles.timestamp}>{item.timestamp.toDate().toLocaleString()}</Text>
      </View>
      <Text style={styles.serviceRequired}>Service: {item.serviceRequired}</Text>
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
        {offers.length > 0 ? (
          <FlatList
            data={offers}
            keyExtractor={(item, index) => (item.id ? `${item.id}-${index}` : index.toString())}
            renderItem={renderOfferItem}
          />
        ) : (
          <View style={styles.noOffersContainer}>
            <Text style={styles.noOffersText}>No job offers available.</Text>
          </View>
        )}
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
  noOffersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOffersText: {
    fontSize: 18,
    color: "#555",
  },
  offerItem: {
    backgroundColor: "#FFFF",
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
  serviceRequired: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 10,  // Added margin top
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

export default OffersTab;
