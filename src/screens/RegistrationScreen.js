import React, { useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectOption, setSelectOption] = useState(''); 

  const handleRegistration = async () => {
    try{
     await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Profile")
      setName('');
      setEmail('');
      setPassword('');
      setSelectOption('');
    } catch (error){
      console.log(error)
      Alert.alert("Registration failed" + error.message);
    } 
  }

  const handleOptionChange = (option) => {
    setSelectOption(option);
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
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'patient' && styles.selectedOption]}
              onPress={() => handleOptionChange('patient')}
            >
              <Icon name="user" size={20} style={styles.icon} color={selectOption === 'patient' ? '#FFF' : 'black'} />
              <Text>Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'specialist' && styles.selectedOption]}
              onPress={() => handleOptionChange('specialist')}
            >
              <Icon name="user-md" size={20} style={styles.icon} color={selectOption === 'specialist' ? '#FFF' : 'black'} />
              <Text>Specialist</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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

export default RegistrationScreen;
