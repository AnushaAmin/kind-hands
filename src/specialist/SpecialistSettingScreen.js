import React from 'react';
import SettingsScreen from '../common/SettingsScreen';
import { View, StyleSheet } from 'react-native';

const SpecialistSettingScreen = () => {
  return (
    <View style={styles.container}>
      <SettingsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SpecialistSettingScreen;
