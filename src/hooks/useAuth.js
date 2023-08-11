import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app, { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);

export function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          getDoc(userDocRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                user.name = userData.name;
                user.userType = userData.userType;
              }
              setUser(user); //user signed in
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } else {
          setUser(undefined); //user signout
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
  };
}
