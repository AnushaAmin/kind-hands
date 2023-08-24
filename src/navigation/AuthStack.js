import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import PatientRegistrationScreen from '../patient/PatientRegistrationScreen';
import SpecialistRegistrationScreen from '../specialist/SpecialistRegistrationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
                <Stack.Screen name="PatientRegistrationScreen" component={PatientRegistrationScreen} />
                <Stack.Screen name="SpecialistRegistrationScreen" component={SpecialistRegistrationScreen}/>
            </Stack.Navigator>
        </NavigationContainer>   
    );
};

export default AuthStack;