import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { Categories } from "../../config/Constants";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from "react-native-gesture-handler";

const CreateJobsScreen = () => {
  const [serviceRequired, setServiceRequired] = useState(Categories[0]);
  const [description, setDescription] = useState("");
  const [genderPreference, setGenderPreference] = useState("male");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const requirementCheck = () => {
    if (description === "" || address === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    return true;
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
          address,
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={require("../../assets/texture.jpg")} style={styles.backgroundImage}>
          {/* <View style={styles.inputContainer}>
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
              label="Enter Description"
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
          </View> */}

          <View style={styles.inputContainer}>
              <GooglePlacesAutocomplete
                placeholder='Search'
                // debounce={400}
                styles={styles.maps}
                query={{
                  key: process.env.API_KEY,
                  language: 'en',
                  
                }}
                fetchDetails={true}
        onPress={(data, details = null) => console.log(data, details)}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
                // onPress={(data, details = null) => {
                //   // 'details' is provided when fetchDetails = true
                //   console.log(data, details);
                // }}
                // onPress={item => { console.log(item); }}
              />
            </View>


          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleCreateJob}>
              Create Job
            </Button>
          </View>
        </ImageBackground>
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
    flex: 1,
    marginLeft: 10,
    borderBottomColor: "gray",
  },
  inputContainer: {
    marginBottom: 50,
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
  maps: {
marginBottom: 50
  }
});

export default CreateJobsScreen;
