import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Platform, StyleSheet, StatusBar, Alert,TouchableWithoutFeedback, Keyboard} from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db} from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const readData = async () => {
    setLoading(true);
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setAddress(docSnap.data().address);
    }
    setLoading(false);
  }

  const handleUpdateProfile = async() => {
      setLoading(true);
      const docRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(docRef, {
        name: name,
    
      })
      setLoading(false);
      Alert.alert('Profile Updated Successfully');
    }

  useEffect(() => {
    readData();
  }, [])
     
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <ActivityIndicator style={{ position: 'absolute', top: 100}} animating={loading} />
        <View style={styles.innerFormContainer}>
         <View style={styles.inputContainer}>
            <Icon name="user" size={19} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              label="Full Name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={18} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              label="Email Address"
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
              label="Your Address"
              editable={false}
            />
          </View>

          <Button onPress={handleUpdateProfile} style={styles.updateButton} mode="contained">
            Update
          </Button>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );

};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
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