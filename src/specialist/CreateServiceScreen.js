import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper'; 
import { Picker } from '@react-native-picker/picker'; 
import { Categories } from '../common/Constants';
import 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';


const CreateServiceScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const requirementCheck = (name, category) => {
    if (name === '' || category === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (requirementCheck(name, category)) {
        try {
          const userServicesCollectionRef = collection(db, 'services', auth.currentUser.uid, "all-services");
      
          
          const newServiceDocRef = await addDoc(userServicesCollectionRef, {
            name: name,
            category: category,
            description: description,
          });
          navigation.navigate('SpecialistServicesScreen');
          setName('');
          setCategory('');
          setDescription('');
        } catch (error) {
          console.error('Error saving service:', error);
        }
      } else {
        console.error('User is not authenticated');
      }
    
  };
  
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name  e.g(My Service 1)"
        value={name}
        onChangeText={setName}
        maxLength={20}
      />
      <Picker
        style={styles.input}
        selectedValue={category}
        onValueChange={setCategory}
      >
        {Categories.map((items) => (
          <Picker.Item key={items} label={items} value={items} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        maxLength={300}
        multiline
      />
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
    borderColor: 'gray',
  },
});

export default CreateServiceScreen;
