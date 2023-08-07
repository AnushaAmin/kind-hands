import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, signOut } from "firebase/auth";
import app from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const auth = getAuth(app);

const SettingsScreen = () => {
  function mynavigator () {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <Button style={styles.button} mode="contained" onPress={() => navigation.goBack() }>Services</Button> 
     <Button style={styles.button} mode="contained" onPress={() => signOut(auth)}>Logout</Button>
   </View>
  ); 
};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  button: {
    margin: '20%',
    width: '50%',
    justifyContent: 'center',
    
  },
});

export default SettingsScreen;
