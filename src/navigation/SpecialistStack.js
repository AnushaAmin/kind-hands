import ProfileTab from "./ProfileTab";
import SpecialistServicesScreen from "../specialist/SpecialistServicesScreen";
import CreateServiceScreen from "../specialist/CreateServiceScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const SpecialistStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} /> 
                <Stack.Screen name="SpecialistServicesScreen" component={SpecialistServicesScreen} />
                <Stack.Screen name="CreateServiceScreen" component={CreateServiceScreen} />
            </Stack.Navigator>
        </NavigationContainer>   
    );
};

export default SpecialistStack;