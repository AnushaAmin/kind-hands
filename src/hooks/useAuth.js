import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export function useAuth() {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); //user signed in
            } else {
                setUser(undefined); //user signout
            }
        });

        return unsubscribeFromAuthStatusChanged;
    }, [])

    return {
        user,
    };
};