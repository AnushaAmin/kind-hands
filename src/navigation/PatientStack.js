import PatientTabs from "./PatientTabs";
import PatientServiceDetailScreen from "../patient/PatientServiceDetailScreen";
import PatientAboutScreen from "../patient/PatientAboutScreen";
import PatientPrivacyScreen from "../patient/PatientPrivacyScreen";
import PatientDisclaimerScreen from "../patient/PatientDisclaimerScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const PatientStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={PatientTabs}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="ServiceDetailScreen"
          component={PatientServiceDetailScreen}
          options={{ title: "Detail Screen", headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="PatientAboutScreen"
          component={PatientAboutScreen}
          options={{ title: "About Us", headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="PatientPrivacyScreen"
          component={PatientPrivacyScreen}
          options={{ title: "Privacy", headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="PatientDisclaimerScreen"
          component={PatientDisclaimerScreen}
          options={{ title: "Disclaimer", headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PatientStack;
