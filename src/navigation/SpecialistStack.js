import ProfileTab from "./ProfileTab";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpecialistServicesScreen from "../specialist/SpecialistServicesScreen";

const Stack = createNativeStackNavigator();

const SpecialistStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} /> 
                <Stack.Screen name="SpecialistServicesScreen" component={SpecialistServicesScreen} />
            </Stack.Navigator>
        </NavigationContainer>   
    );
};

export default SpecialistStack;