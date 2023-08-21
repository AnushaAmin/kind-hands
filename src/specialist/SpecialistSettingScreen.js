import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text} from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import app from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(app);

const SpecialistSettingScreen = () => {
  const navigation = useNavigation();
  const data = [
    { id: "1", name: "Services" },
    { id: "2", name: "Verification" }];
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (item.id === "1") {
            navigation.navigate("SpecialistServicesScreen");
          } else if (item.id === "2") {
            navigation.navigate("SpecialistVerificationScreen"); 
          }
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => signOut(auth)}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    margin: "20%",
    width: "50%",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});

export default SpecialistSettingScreen;
