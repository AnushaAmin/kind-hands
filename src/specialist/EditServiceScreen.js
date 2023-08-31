import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Picker } from "@react-native-picker/picker";
import { Categories } from "../../config/Constants";

const EditServiceScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const { serviceId } = route.params;

  useEffect(() => {
    const ReadData = async () => {
      const userServicesDocRef = doc(db, "services", auth.currentUser.uid, "all-services", serviceId);
      const docSnap = await getDoc(userServicesDocRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setCategory(docSnap.data().category);
        setDescription(docSnap.data().description);
      }
    }
    ReadData();
  }, [serviceId]);

  const handleUpdate = async () => {
    const userServicesDocRef = doc(db, "services", auth.currentUser.uid, "all-services", serviceId);

    await updateDoc(userServicesDocRef, {
      name: name,
      category: category,
      description: description
    });

    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Do you really want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const userServicesDocRef = doc(db, "services", auth.currentUser.uid, "all-services", serviceId);
              await deleteDoc(userServicesDocRef);
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting service:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
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
        <Button onPress={handleUpdate} style={styles.updateButton} mode="contained">
          Update
        </Button>
        <Button onPress={handleDelete} style={styles.deleteButton} mode="contained">
          Delete
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "rgb(0, 95, 175)",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default EditServiceScreen;
