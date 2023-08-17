import React, { useState } from "react";
import {View, StyleSheet, TextInput, Alert, ScrollView, Keyboard} from "react-native";
import { Button } from "react-native-paper";
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
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        maxLength={20}
      />

      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        itemStyle={styles.picker}
      >
        {Categories.map((items) => (
          <Picker.Item key={items} label={items} value={items} />
        ))}
      </Picker>

      <ScrollView scrollEnabled={false}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          maxLength={300}
          multiline
          onBlur={() => {
            Keyboard.dismiss();
          }}
        />
      </ScrollView>

      <Button mode="contained" onPress={handleSave}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  picker: {
    backgroundColor: "darkgrey",
    color: "black",
    height: 100,
    fontSize: 13,
    marginBottom: 10,
  },
});

export default CreateServiceScreen;
