import React, { useState } from 'react';
import AuthStack from './src/navigation/AuthStack';
import SpecialistStack from './src/navigation/SpecialistStack';
import { useAuth } from './src/hooks/useAuth';



const App = () => {
  const {user} = useAuth();

  return (
       user ? <SpecialistStack /> : <AuthStack />
  );
};

export default App;
