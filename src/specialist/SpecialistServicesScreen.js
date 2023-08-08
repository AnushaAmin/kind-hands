import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icons
import { useNavigation } from '@react-navigation/native';

const SpecialistServicesScreen = () => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('CreateServiceScreen');
          }}>
          <FontAwesome name="plus" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9F91CC',
    borderRadius: 25,
    padding: 10,
  },
});

export default SpecialistServicesScreen;
