import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Categories } from "../../config/Constants";
import "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

const CreateServiceScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Canula Insertion");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const requirementCheck = () => {
    if (name === "" || category === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (requirementCheck()) {
      try {
        const userServicesCollectionRef = collection(
          db,
          "services",
          auth.currentUser.uid,
          "all-services"
        );
        const newServiceDocRef = await addDoc(userServicesCollectionRef, {
          user_id: auth.currentUser.uid,
          name: name,
          category: category,
          description: description,
        });
        navigation.navigate("SpecialistServicesScreen");

        setName("");
        setCategory("");
        setDescription("");
      } catch (error) {
        console.error("Error saving service:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Enter Service Name"
          value={name}
          onChangeText={setName}
          maxLength={20}
          mode="outlined"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Categories.map((items) => (
            <Picker.Item key={items} label={items} value={items} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Enter Detailed Description"
          value={description}
          onChangeText={setDescription}
          maxLength={300}
          multiline
          onBlur={() => {
            Keyboard.dismiss();
          }}
          mode="outlined"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSave}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10
  },
  picker: {
    height: 45,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateServiceScreen;
