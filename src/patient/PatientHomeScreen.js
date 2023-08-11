import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Patient's HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PatientHomeScreen;
