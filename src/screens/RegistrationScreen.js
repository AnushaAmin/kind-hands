import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.formContainer}>
      <View style={styles.innerFormContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("PatientRegistrationScreen")}
            style={styles.button}
            mode="contained"
            labelStyle={styles.buttonText}
          >
            Signup as a Patient
          </Button>
          <Button
            onPress={() => navigation.navigate("SpecialistRegistrationScreen")}
            style={styles.button}
            mode="contained"
            labelStyle={styles.buttonText}
          >
            Signup as a Specialist
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  innerFormContainer: {
    width: '95%',
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
  },
  button: {
   marginBottom: "5%"
  },
  
  buttonText: {
    fontSize: 14, 
  },
});

export default RegistrationScreen;
