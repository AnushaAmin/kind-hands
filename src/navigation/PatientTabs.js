import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
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
          } else if (route.name === 'PatientSettingScreen') {
            iconName = 'cog';
          } else if (route.name === 'PatientHomeScreen') {
            iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={focused ? 'rgb(0, 95, 175)' : 'gray'} />;
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
      <Tab.Screen name="PatientProfileScreen" component={PatientProfileScreen} />
      <Tab.Screen name="PatientSettingScreen" component={PatientSettingScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTab;
