import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, Modal, FlatList } from "react-native";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";

const SpecialistOffersScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const [offers, setOffers] = useState([]);
  const [offerText, setOfferText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUserOffer, setCurrentUserOffer] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const jobDocRef = doc(db, 'jobs', job.id);
        const jobDocSnapshot = await getDoc(jobDocRef);

        if (jobDocSnapshot.exists()) {
          const jobData = jobDocSnapshot.data();
          setOffers(jobData.offers || []);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false);
      }
    };

    const fetchCurrentUserOffer = () => {
      const user = auth.currentUser;
      if (user) {
        const userOffer = offers.find((offer) => offer.userId === user.uid);
        setCurrentUserOffer(userOffer);
      }
    };

    fetchJobData();
    fetchCurrentUserOffer();
  }, [job, offers]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePlaceOffer = async () => {
    try {
      setLoading(true);

      // Check if the offerText is not empty
      if (offerText.trim() !== "") {
        const user = auth.currentUser;

        if (user) {
          const jobDocRef = doc(db, 'jobs', job.id);

          // Update the offers array with the new offerText and user ID
          await updateDoc(jobDocRef, {
            offers: arrayUnion({ text: offerText, userId: user.uid, timestamp: new Date() }),
          });

          // Update the local offers state
          setOffers([...offers, { text: offerText, userId: user.uid, timestamp: new Date() }]);
          setOfferText("");
          setLoading(false);
          toggleModal();
          Alert.alert('Success', 'Offer placed successfully!');
        } else {
          setLoading(false);
          Alert.alert('Error', 'User not authenticated. Please log in and try again.');
        }
      } else {
        setLoading(false);
        Alert.alert('Error', 'Please enter a non-empty offer text.');
      }
    } catch (error) {
      console.error('Error placing offer:', error);
      setLoading(false);
      Alert.alert('Error', 'Unable to place the offer. Please try again later.');
    }
  };

  // Function to check if a date is valid
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/texture.jpg")} style={styles.image}>
        <View style={styles.contentContainer}>
          <Text style={styles.jobTitle}>Service Required: {job.serviceRequired}</Text>
          <Text style={styles.jobDetails}>Description: {job.description}</Text>
          <Text style={styles.jobDetails}>Gender Preference: {job.genderPreference}</Text>
          <Text style={styles.jobDetails}>Address: {job.address}</Text>

          {currentUserOffer && currentUserOffer.timestamp && (
            <View>
              <Text style={styles.sectionTitle}>Offers</Text>
              <View style={styles.offerItem}>
                <Text>{currentUserOffer.text}</Text>
                {isValidDate(currentUserOffer.timestamp) && (
                  <Text style={styles.offerTimestamp}>
                    {new Date(currentUserOffer.timestamp).toISOString()}
                  </Text>
                )}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.placeOfferButton}
            onPress={toggleModal}
          >
            <Text style={styles.buttonText}>Place Offer</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Place Your Offer</Text>
                <TextInput
                  style={styles.modalInput}
                  value={offerText}
                  onChangeText={setOfferText}
                  maxLength={300}
                  multiline
                  mode="outlined"
                />
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={toggleModal}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handlePlaceOffer}
                  >
                    <Text style={styles.modalButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
    padding: 20,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jobDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeOfferButton: {
    backgroundColor: "rgb(0, 95, 175)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%", 
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "rgb(0, 95, 175)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  offerItem: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  offerTimestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});

export default SpecialistOffersScreen;
