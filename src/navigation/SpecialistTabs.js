import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SpecialistProfileScreen from '../specialist/SpecialistProfileScreen';
import SpecialistSettingScreen from '../specialist/SpecialistSettingScreen';
import SpecialistMessagesScreen from '../specialist/SpecialistMessagesScreen';
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
            
          } else if (route.name === "Messages"){
            iconName = 'comments';
          }
           else if (route.name === 'Settings') {
            iconName = 'cog';
            
          } 
          return <Icon name={iconName} size={size} color={focused ? 'rgb(0, 95, 175)' : 'gray'} />;
        },
        tabBarLabel: () => null
      })}
    >
      <Tab.Screen name="SpecialistProfileScreen" component={SpecialistProfileScreen} options={{ headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}/>
      <Tab.Screen name="Messages" component={SpecialistMessagesScreen} options={{ headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}/>
      <Tab.Screen name="Settings" component={SpecialistSettingScreen}  options={{ headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}/>
    </Tab.Navigator>
  );
};

export default SpecialistTabs;
