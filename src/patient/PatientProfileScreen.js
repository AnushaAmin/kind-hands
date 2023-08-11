import React from 'react';
import ProfileScreen from '../common/ProfileScreen';
import { View, StyleSheet } from 'react-native';

const PatientProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PatientProfileScreen;
