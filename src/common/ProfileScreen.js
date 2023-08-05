import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert, TouchableOpacity} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db} from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectOption, setSelectOption] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const ReadData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setSelectOption(docSnap.data().userType);
      }
    }
    ReadData();
  }, [])


  const handleUpdateProfile = async() => {
      const docRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(docRef, {
        name: name,
    
      })
      Alert.alert('Profile Updated Successfully');
    }
     

  const handleOptionChange = (option) => {
    setSelectOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.innerFormContainer}>

         <View style={styles.inputContainer}>
            <Icon name="user" size={19} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Full Name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={18} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder="Email"
              editable={false}
            />
          </View>

          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'patient' && styles.selectedOption]}
              onPress={() => handleOptionChange('patient')}  disabled={true}
            >
              <Icon name="user" size={20} style={styles.icon} color={selectOption === 'patient' ? '#FFF' : 'black'} />
              <Text>Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'specialist' && styles.selectedOption]}
              onPress={() => handleOptionChange('specialist')}  disabled={true}
            >
              <Icon name="user-md" size={20} style={styles.icon} color={selectOption === 'specialist' ? '#FFF' : 'black'} />
              <Text>Specialist</Text>
            </TouchableOpacity>
          </View>
          <Button onPress={handleUpdateProfile} style={styles.updateButton} mode="contained">
            Update
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  innerFormContainer: {
    width: '95%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
   updateButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },  
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  optionButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  selectedOption: {
    backgroundColor: '#907FA4',
  },
  icon: {
    marginRight: 10,
  },

});

export default ProfileScreen;