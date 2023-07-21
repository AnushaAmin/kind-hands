import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SpecialistProfileScreen from '../specialist/SpecialistProfileScreen';
import SpecialistSettingScreen from '../specialist/SpecialistSettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  export default ProfileTab;