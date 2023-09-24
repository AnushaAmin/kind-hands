import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Platform, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { ActivityIndicator, Button, TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);

  const LocalImage = require("../../assets/texture.jpg");

  const readData = async () => {
    setLoading(true);
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setAddress(docSnap.data().address);

      if (docSnap.data().phoneNumber) {
        setPhoneNumber(docSnap.data().phoneNumber);
        setPhoneNumberExists(true);
      }
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const docRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(docRef, {
      name: name,
      phoneNumber: phoneNumber,
    });
    setLoading(false);
    Alert.alert('Profile Updated Successfully');
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
          <ActivityIndicator style={{ position: 'absolute', top: '30%', left: '55%', transform: [{ translateX: -25 }, { translateY: -25 }] }} animating={loading} />
          
        
          <View style={styles.profileMockup}>
            <Icon name="user" size={50} color="grey" />
            <Text style={styles.profileName}>{name}</Text>
          </View>

          <View style={styles.innerFormContainer}>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="#555" />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                keyboardType="email-address"
                label="Full Name"
                editable={true}
              />
              </View>

            <View style={styles.inputContainer}>
              <Icon name="envelope" size={18} color="#555" />
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
              <Icon name="map-marker" size={20} color="#555" />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={(text) => setAddress(text)}
                label="Your Address"
                editable={false}
              />
            </View>

            {phoneNumberExists && (
              <View style={styles.inputContainer}>
                <Icon name="phone" size={18} color="#555" />
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  label="Phone Number"
                  editable={false}
                />
              </View>
            )}

            <Button onPress={handleUpdateProfile} style={styles.updateButton} mode="contained">
              Update
            </Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  innerFormContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: "80%",
    marginTop: "10%",
    marginLeft:"auto",
    marginBottom:"auto",
    marginRight:"auto",
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    borderBottomColor: 'gray',
    flex: 1,
  },
  updateButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  profileMockup: {
    alignItems: 'center',
    marginTop: '20%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 10,
  },
});

export default ProfileScreen;
