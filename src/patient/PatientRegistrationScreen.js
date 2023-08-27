import React, { useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword} from '@firebase/auth';
import app from '../../config/firebaseConfig';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import {db} from '../../config/firebaseConfig';

const auth = getAuth(app);


const PatientRegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [address, setAddress] = useState('');
  const [selectedGender, setSelectedGender] = useState(''); 

    const isValidEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
         };

    const validateForm = (name, email, password, address, selectedGender) => {
      if (name === '' || email === '' || password === '' || address === '' || selectedGender === '') {
       Alert.alert('Error', 'Please fill in all fields');
       return false;
  }   else if (!isValidEmail(email)) {
       Alert.alert('Invalid Email', 'Please enter a valid email address');
       return false;
  }
    return true;
};

const handleRegistration = async () => {
  if (validateForm(name, email, password)) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const firestore = getFirestore(app);
      const docRef = await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: name,
        email: email,
        userType: "patient"
      })
      setName('');
      setEmail('');
      setPassword('');
      setAddress('');
      setSelectedGender('');
    } catch (error) {
      console.log(error);
      Alert.alert('Registration failed', error.message);
    }
  
  }
  
};

  const handleLoginButtonPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.innerFormContainer}>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter Full Name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={18} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder="Enter Email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholder="Enter Password"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Enter Your Address"
            />
          </View>

          <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedGender === 'male' && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender('male')}
          >
            <Icon name="male" size={20} style={styles.icon} color={selectedGender === 'male' ? '#FFF' : 'black'} />
            <Text>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedGender === 'female' && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender('female')}
          >
            <Icon name="female" size={20} style={styles.icon} color={selectedGender === 'female' ? '#FFF' : 'black'} />
            <Text>Female</Text>
          </TouchableOpacity>
        </View>

          <Button onPress={handleRegistration} style={styles.registerButton} mode="contained">
            Register
          </Button>
          <View style={styles.loginButton}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginButtonPress} >
            <Text >Already have an Account? LOGIN </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PatientRegistrationScreen;
