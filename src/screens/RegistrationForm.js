import React, { useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectOption, setSelectOption] = useState('');

  const handleRegistration = () => {
    if (name === '' || email === '' || password === '' || selectOption === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    } else {
      Alert.alert('Registered Successfully');
      setName('');
      setEmail('');
      setPassword('');
      setSelectOption('');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOptionChange = (option) => {
    setSelectOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.innerFormContainer}>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Full Name"
            left={<TextInput.Icon name="user" />} />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholder="Enter Email"
            left={<TextInput.Icon name="envelope" />}/>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder="Enter Password"
            left={<Icon name="lock"/>}/>

          <View style={styles.optionContainer}>

            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'patient' && styles.selectedOption]}
              onPress={() => handleOptionChange('patient')}>
              <Icon name="user" size={20} style={styles.icon} color={selectOption === 'patient' ? '#FFF' : 'black'} />
              <Text>Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, selectOption === 'specialist' && styles.selectedOption]}
              onPress={() => handleOptionChange('specialist')} >
              <Icon  name="user-md" size={20} style={styles.icon} color={selectOption === 'specialist' ? '#FFF' : 'black'} />
              <Text>Specialist</Text>
            </TouchableOpacity>

          </View>

          <Button onPress={handleRegistration} style={styles.registerButton} mode="contained">
            Register
          </Button>

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
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  registerButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  icon : {
   marginRight: 10
  },
});

export default RegistrationForm;
