import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import { View, StyleSheet } from 'react-native';

const SpecialistProfileScreen = () => {
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

export default SpecialistProfileScreen;
