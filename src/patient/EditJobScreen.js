import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";

const EditJobScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(false);

  const [serviceRequired, setServiceRequired] = useState(job.serviceRequired);
  const [description, setDescription] = useState(job.description);
  const [genderPreference, setGenderPreference] = useState(job.genderPreference);
  const [address, setAddress] = useState(job.address);

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCreator = async () => {
      try {
        const creatorDocRef = doc(db, "users", job.user_id);
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
  }, [job]);

  const toggleEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const jobDocRef = doc(db, 'jobs', job.id);
      const jobDocSnapshot = await getDoc(jobDocRef);

      if (jobDocSnapshot.exists()) {
        const updatedData = {
          serviceRequired,
          description,
          genderPreference,
          address,
        };

        const mergedData = { ...jobDocSnapshot.data(), ...updatedData };

        await updateDoc(jobDocRef, mergedData);

        setServiceRequired(mergedData.serviceRequired);
        setDescription(mergedData.description);
        setGenderPreference(mergedData.genderPreference);
        setAddress(mergedData.address);

        setLoading(false);
        toggleEditForm();
      } else {
        setLoading(false);
        Alert.alert('Error', 'Job not found. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      setLoading(false);
      Alert.alert('Error', 'Unable to update the job. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/texture.jpg")} style={styles.image}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <View style={styles.topLine}></View>
            {isEditFormVisible ? (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Service Required<Text style={styles.star}>*</Text></Text>
                  <View style={[styles.input, styles.pickerContainer]}>
                    <Picker
                      selectedValue={serviceRequired}
                      onValueChange={(itemValue) => setServiceRequired(itemValue)}
                    >
                      {Categories.map((category) => (
                        <Picker.Item key={category} label={category} value={category} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Description<Text style={styles.star}>*</Text></Text>
                  <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    maxLength={300}
                    multiline
                    mode="outlined"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gender Preference<Text style={styles.star}>*</Text></Text>
                  <View style={styles.radioContainer}>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="male"
                        status={genderPreference === "male" ? "checked" : "unchecked"}
                        onPress={() => setGenderPreference("male")}
                      />
                      <Text>Male</Text>
                    </View>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="female"
                        status={genderPreference === "female" ? "checked" : "unchecked"}
                        onPress={() => setGenderPreference("female")}
                      />
                      <Text>Female</Text>
                    </View>
                    <View style={styles.radioButton}>
                      <RadioButton
                        value="none"
                        status={genderPreference === "none" ? "checked" : "unchecked"}
                        onPress={() => setGenderPreference("none")}
                      />
                      <Text>None</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address<Text style={styles.star}>*</Text></Text>
                  <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    maxLength={100}
                    mode="outlined"
                  />
                </View>
                
              </View>
            ) : (
              <View style={styles.jobContent}>
                <Text style={[styles.jobTitle, styles.boldText, { marginBottom: 10 }]}>Service Required: {serviceRequired}</Text>

                <Text style={[styles.jobTitle, { marginTop: 20, marginBottom: 10 }]}>
                  <Text style={styles.boldText}>Description:</Text> {description}
                </Text>

                <Text style={[styles.jobTitle, { marginTop: 20, marginBottom: 10 }]}>
                  <Text style={styles.boldText}>Gender Preference:</Text> {genderPreference}
                </Text>

                <Text style={[styles.jobTitle, { marginTop: 20, marginBottom: 10 }]}>
                  <Text style={styles.boldText}>Address:</Text> {address}
                </Text>

              </View>
            )}
            <View style={styles.bottomLine}></View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={toggleEditForm}
              >
                <Text style={styles.buttonText}>{isEditFormVisible ? 'Cancel' : 'Edit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: "green" }]}
            onPress={() => {
              if (isEditFormVisible) {
                handleSave();
              } else {
                navigation.navigate("JobOfferScreen", { jobId: job.id });
              }
            }}
          >
          <Text style={styles.buttonText}>{isEditFormVisible ? 'Save' : 'Offers'}</Text>
        </TouchableOpacity>

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
  topLine: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
  },
  jobContent: {
    marginTop: 10,
  },
  jobTitle: {
    fontSize: 18,
    color: "#333",
  },
  jobDetails: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  bottomLine: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: "rgb(0, 95, 175)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: "gray",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  star: {
    color: "red",
  },
  buttonContainer: {
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default EditJobScreen;
