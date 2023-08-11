import React from "react";
import AuthStack from "./src/navigation/AuthStack";
import PatientStack from "./src/navigation/PatientStack";
import SpecialistStack from "./src/navigation/SpecialistStack";
import { useAuth } from "./src/hooks/useAuth";

const App = () => {
  const { user } = useAuth();

  if (user && user.userType === "patient") {
    return <PatientStack />;
  } else if (user && user.userType === "specialist") {
    return <SpecialistStack />;
  } else {
    return <AuthStack />;
  }
};
export default App;
