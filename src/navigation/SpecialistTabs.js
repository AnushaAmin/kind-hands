import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SpecialistProfileScreen from '../specialist/SpecialistProfileScreen';
import SpecialistSettingScreen from '../specialist/SpecialistSettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const SpecialistTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let size = 20;

          if (route.name === 'SpecialistProfileScreen') {
            iconName = 'user';
            
          } else if (route.name === 'SpecialistSettingScreen') {
            iconName = 'cog';
            
          }
          return <Icon name={iconName} size={size} color={focused ? 'rgb(0, 95, 175)' : 'gray'} />;
        },
        tabBarLabel: () => null
      })}
    >
      <Tab.Screen name="SpecialistProfileScreen" component={SpecialistProfileScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="SpecialistSettingScreen" component={SpecialistSettingScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default SpecialistTabs;
