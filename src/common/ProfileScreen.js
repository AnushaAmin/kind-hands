import React, { useState } from 'react';
import { SafeAreaView, View, Platform, StyleSheet, StatusBar, Alert} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const handleUpdateProfile = () => {
    if (name === '' || email === '' || newpassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    } else {
      Alert.alert('Profile Updated Successfully');
      setName('');
      setEmail('');
      setNewPassword('');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.innerFormContainer}>

         <View style={styles.inputContainer}>
            <Icon name="user" size={19} />
            <TextInput
              style={styles.input}
              value={email}
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
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={24} />
            <TextInput
              style={styles.input}
              value={newpassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              placeholder="Password"
            />
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

});

export default ProfileScreen;
