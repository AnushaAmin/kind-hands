import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {LoginScreen} from '../screens/LoginScreen';
import {RegistrationScreen} from '../screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
            </Stack.Navigator>
        </NavigationContainer>   
    );
};

export default AuthStack;