import React, { useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import app from '../../config/firebaseConfig';

const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginForm = (email, password) => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    } else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLoginForm(email, password)) {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        Keyboard.dismiss(); 
      } catch (error) {
        setEmail('');
        setPassword('');
        setLoading(false);
        Alert.alert('Login failed', error.message);
      }
    }
  };

  const handleRegisterButtonPress = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <ActivityIndicator style={{ position: 'absolute', top: 100 }} animating={loading} />
          <View style={styles.innerFormContainer}>
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={18} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                label="Enter Email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={24} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                label="Enter Password"
              />
            </View>
            <Button onPress={handleLogin} style={styles.loginButton} mode="contained">
              Login
            </Button>
            <View style={styles.registerButton}>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegisterButtonPress}>
                <Text>Create an Account? REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
