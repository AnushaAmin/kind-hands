import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import "firebase/firestore";
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
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
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
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline 
        onBlur={() => {
          Keyboard.dismiss(); 
        }}
      />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 20, 
  },
  updateButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#9F91CC",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default EditServiceScreen;
