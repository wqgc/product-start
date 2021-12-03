import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moneyFormatter from 'money-formatter';
import { UserState } from '../../types';
import UserService from '../../services/UserService';

const PledgeSuccessPage: React.FC<{ user: UserState }> = ({ user }) => {
    const { id, pledgeAmount } = useParams();

    useEffect(() => {
        UserService.confirmPledge();
    }, []);

    return (
        <div>
            <h2>Success!</h2>
            <p>
                {user.profile.displayName}, you have successfully pledged {moneyFormatter.format('USD', pledgeAmount)}.
            </p>
            <Link to={`/products/${id}`}>Return to Product Page</Link>
        </div>
    );
};

export default PledgeSuccessPage;
