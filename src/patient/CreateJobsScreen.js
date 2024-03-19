import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const CreateJobsScreen = () => {
  const [serviceRequired, setServiceRequired] = useState(Categories[0]);
  const [description, setDescription] = useState("");
  const [genderPreference, setGenderPreference] = useState("male");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigation = useNavigation();

  const requirementCheck = () => {
    if (description === "" || address === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    return true;
  };

  const handlePlaceSelect = (data, details = null) => {
    const { lat, lng } = details.geometry.location;
    setLatitude(lat);
    setLongitude(lng);
    setAddress(data.description); 
    console.log("Latitude:", lat, "Longitude:", lng);
  };

  const handleCreateJob = async () => {
    if (requirementCheck()) {
      try {
        const jobsCollectionRef = collection(db, "jobs");
        await addDoc(jobsCollectionRef, {
          user_id: auth.currentUser.uid,
          serviceRequired: serviceRequired,
          description,
          genderPreference,
          address
        });

        setServiceRequired("");
        setDescription("");
        setGenderPreference("");
        setAddress("");

        navigation.navigate("PatientJobScreen");
      } catch (error) {
        console.error("Error creating job:", error);
      }
    }
  };
 const API = process.env.API_KEY;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={require("../../assets/texture.jpg")} style={styles.backgroundImage}>
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
              style={{ borderColor: "black" }}
              placeholder="Enter Description"
              value={description}
              onChangeText={setDescription}
              maxLength={300}
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
            <Text style={styles.label}>Location<Text style={styles.star}>*</Text></Text>
            <GooglePlacesAutocomplete
              placeholder='Enter Location'
              styles={styles.maps}
              query={{
                key: API,
                language: 'en',
              }}
              fetchDetails={true}
              onPress={handlePlaceSelect}
              onFail={error => console.log(error)}
              onNotFound={() => console.log('no results')}
            />
          </View>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Selected Location:</Text>
            <Text>{address}</Text>
          </View> */}

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleCreateJob}>
              Create Job
            </Button>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
  },
  inputContainer: {
    marginBottom: 30,
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
  },
  maps: {
    marginBottom: 20,
    flex: 1,
  }
});

export default CreateJobsScreen;

