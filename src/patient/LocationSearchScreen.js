import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationSearchScreen = ({ handlePlaceSelect, API }) => {
  return (
    <ImageBackground source={require("../../assets/texture.jpg")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          styles={styles.maps}
          query={{
            key: API, 
            language: 'en',
          }}
          fetchDetails={true}
          onPress={handlePlaceSelect}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"50%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  maps: {
    width: "80%",
    height: "30%",
  }
});

export default LocationSearchScreen;
