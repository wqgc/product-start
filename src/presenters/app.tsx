import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { UserState, AlertState } from '../types';
import UserService from '../services/UserService';

type SetUserStatusParameter = React.Dispatch<React.SetStateAction<UserState>> | null
type LogoutHandlerParameter = React.Dispatch<React.SetStateAction<AlertState>> | null

class AppPresenter {
    // Sets whether user is online or not into context
    static setUserStatus(setUser: SetUserStatusParameter) {
        const auth = getAuth();

        if (!setUser) {
            return null;
        }

        return onAuthStateChanged(auth, (user) => {
            if (user && user.displayName) {
                setUser({
                    signedIn: true,
                    profile: {
                        displayName: user.displayName,
                    },
                });
            } else {
                setUser((prevState) => {
                    return { ...prevState, signedIn: false };
                });
            }
        });
    }

    static async logoutHandler(setAlert: LogoutHandlerParameter) {
        if (setAlert !== null) {
            try {
                await UserService.logout();
                setAlert({ message: 'Successfully logged out!', type: 'success' });
            } catch (error: any) {
                setAlert({ message: error.message, type: 'error' });
            }
        }
    }
}

export default AppPresenter;
