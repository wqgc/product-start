import React from 'react';
import { UserState } from '../types';

interface UserContextValue {
    user: UserState
    setUser: React.Dispatch<React.SetStateAction<UserState>> | null
}

const UserContext = React.createContext(
    {
        user: { signedIn: false } as UserState,
        setUser: null,
    } as UserContextValue,
);

export default UserContext;
