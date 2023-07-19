import React, {useState, useEffect} from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginForm from './src/screens/LoginForm';
import RegistrationForm from './src/screens/RegistrationForm';
import SpecialistProfileScreen from './src/specialist/SpecialistProfileScreen';
import SpecialistSettingScreen from './src/specialist/SpecialistSettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';


 const Stack = createNativeStackNavigator();
 const Tab = createMaterialTopTabNavigator();

 const ProfileTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => {
          let iconName;
          if (route.name === 'SpecialistProfileScreen') {
            iconName = 'user';
            size = 15;
          } else if (route.name === 'SpecialistSettingScreen') {
            iconName = 'cog';
            size = 15;
          }
          return <Icon name={iconName} size={size} />;
        },
        tabBarLabel: () => null,
        tabBarStyle: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, }
      })}

    >
      <Tab.Screen name="SpecialistProfileScreen" component={SpecialistProfileScreen} />
      <Tab.Screen name="SpecialistSettingScreen" component={SpecialistSettingScreen} /> 
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegistrationForm} />
        <Stack.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>   
  );
};

export default App;
