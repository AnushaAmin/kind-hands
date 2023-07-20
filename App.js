import React, { useState } from 'react';
import AuthStack from './src/navigation/AuthStack';
import SpecialistStack from './src/navigation/SpecialistStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


 const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(false);

  return (
       user ? <SpecialistStack /> : <AuthStack />
  );
};

export default App;
