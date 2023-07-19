import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} mode="contained">Logout</Button>
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
