import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Platform, StyleSheet, StatusBar, Alert, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const LocalImage = require("../../assets/texture.jpg");

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
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const docRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(docRef, {
      name: name,
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
          <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }} animating={loading} />
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
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 10,
    borderBottomColor: 'gray',
    flex: 1, // Make TextInput take up available space
  },
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
    marginTop: "auto",
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
  updateButton: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
  }
});

export default ProfileScreen;
