import SpecialistTabs from '../navigation/SpecialistTabs';
import SpecialistServicesScreen from "../specialist/SpecialistServicesScreen";
import CreateServiceScreen from "../specialist/CreateServiceScreen";
import EditServiceScreen from "../specialist/EditServiceScreen";
import SpecialistVerificationScreen from '../specialist/SpecialistVerificationScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const SpecialistStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={SpecialistTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpecialistServicesScreen"
          component={SpecialistServicesScreen}
          options={{ title: "Services",  headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="CreateServiceScreen"
          component={CreateServiceScreen}
          options={{ title: "Create",  headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="EditServiceScreen"
          component={EditServiceScreen}
          options={{ title: "Edit",  headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="SpecialistVerificationScreen"
          component={SpecialistVerificationScreen}
          options={{ title: "Verification",  headerStyle: { backgroundColor: 'rgb(0, 95, 175)' }, headerTintColor: 'white' }}
        />
        <Stack.Screen  name="ChatScreen"  component={ChatScreen}  options={({ route }) => ({
           title: route.params?.patientName || 'Chat',
           headerStyle: { backgroundColor: 'rgb(0, 95, 175)' },
           headerTintColor: 'white',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SpecialistStack;
