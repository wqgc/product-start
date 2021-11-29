import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { UserState } from '../types';

type SetUserStatusParameter = React.Dispatch<React.SetStateAction<UserState>> | null

class AppPresenter {
    // Sets whether user is online or not into context
    static setUserStatus(setUser: SetUserStatusParameter) {
        const auth = getAuth();

        if (!setUser) {
            return null;
        }

        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser((prevState) => {
                    return { ...prevState, signedIn: true };
                });
            } else {
                setUser((prevState) => {
                    return { ...prevState, signedIn: false };
                });
            }
        });
    }
}

export default AppPresenter;
