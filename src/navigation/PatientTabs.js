import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform, StatusBar } from 'react-native'; 
import PatientProfileScreen from '../patient/PatientProfileScreen';
import PatientSettingScreen from '../patient/PatientSettingsScreen';
import PatientHomeScreen from '../patient/PatientHomeScreen';

const Tab = createBottomTabNavigator();

const ProfileTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let size = 20;

          if (route.name === 'PatientProfileScreen') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else if (route.name === 'Categories') {
            iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={focused ? 'rgb(0, 95, 175)' : 'grey'} />;
        },
        tabBarLabel: () => null,
      })}
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} 
    >
      <Tab.Screen name="Categories" component={PatientHomeScreen} options={{ headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }} />
      <Tab.Screen name="PatientProfileScreen" component={PatientProfileScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={PatientSettingScreen} options={{ headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }} />
      </Tab.Navigator>
  );
};

export default ProfileTab;
