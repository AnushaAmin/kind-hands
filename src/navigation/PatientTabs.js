import {Platform, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PatientProfileScreen from '../patient/PatientProfileScreen';
import PatientSettingScreen from '../patient/PatientSettingsScreen';
import PatientHomeScreen from '../patient/PatientHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size }) => {
            let iconName;
            if (route.name === 'PatientProfileScreen') {
              iconName = 'user';
              size = 15;
            } else if (route.name === 'PatientSettingScreen') {
              iconName = 'cog';
              size = 15;
            } else if(route.name === 'PatientHomeScreen'){
                iconName = 'home';
                size = 15; 
            }
            return <Icon name={iconName} size={size} />;
          },
          tabBarLabel: () => null,
          tabBarStyle: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, }
        })}
  
      >
        <Tab.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
        <Tab.Screen name="PatientProfileScreen" component={PatientProfileScreen} />
        <Tab.Screen name="PatientSettingScreen" component={PatientSettingScreen} />
      </Tab.Navigator>
    );
  };

  export default ProfileTab;