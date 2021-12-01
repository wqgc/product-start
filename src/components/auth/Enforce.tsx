import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../types';

interface EnforceProps {
    enforce: 'signedIn' | 'signedOut'
    user: UserState
}

// Wrap around route element to enforce what is viewable based on user state
const Enforce: React.FC<EnforceProps> = ({ enforce, user, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (enforce === 'signedIn' && user.signedIn === false) {
            navigate('/login', { replace: false });
        } else if (enforce === 'signedOut' && user.signedIn === true) {
            navigate('/', { replace: false });
        }
    }, [enforce, user]);

    return (
        <div>
            {children}
        </div>
    );
};

export default Enforce;
