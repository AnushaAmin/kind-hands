import SpecialistTabs from '../navigation/SpecialistTabs';
import SpecialistServicesScreen from "../specialist/SpecialistServicesScreen";
import CreateServiceScreen from "../specialist/CreateServiceScreen";
import EditServiceScreen from "../specialist/EditServiceScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          options={{ title: "Services" }}
        />
        <Stack.Screen
          name="CreateServiceScreen"
          component={CreateServiceScreen}
          options={{ title: "Create" }}
        />
        <Stack.Screen
          name="EditServiceScreen"
          component={EditServiceScreen}
          options={{ title: "Edit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SpecialistStack;
