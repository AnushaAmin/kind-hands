import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} mode="contained" onPress={() => signOut(auth)}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: '20%',
    width: '50%',
    justifyContent: 'center',
    
  },
});

export default SettingsScreen;
