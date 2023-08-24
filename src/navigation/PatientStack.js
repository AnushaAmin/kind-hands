import PatientTabs from "./PatientTabs";
import PatientServiceDetailScreen from "../patient/PatientServiceDetailScreen";
import PatientRegistrationScreen from "../patient/PatientRegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


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
          options={{ title: "Detail Screen" }}
        />
        <Stack.Screen
          name="PatientRegistrationScreen"
          component={PatientRegistrationScreen}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PatientStack;
