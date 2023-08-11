import React, { useEffect, useState } from 'react';
import AuthStack from './src/navigation/AuthStack';
import PatientStack from './src/navigation/PatientStack';
import SpecialistStack from './src/navigation/SpecialistStack'; 
import { useAuth } from './src/hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from './config/firebaseConfig'; 

const App = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid); 
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserType(userData.userType);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  if (user) {
    if (userType === 'patient') {
      return <PatientStack />;
    } else if (userType === 'specialist') {
      return <SpecialistStack />;
    } else {
    return <AuthStack />;
  }
};
}
export default App;
