import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserState } from '../../types';

const PledgeSuccessPage: React.FC<{ user: UserState }> = ({ user }) => {
    const { id, pledgeAmount } = useParams();

    return (
        <div>
            <h2>Success!</h2>
            <p>
                {user.profile.displayName}, you have successfully pledged ${pledgeAmount}.
            </p>
            <Link to={`/products/${id}`}>Return to Product Page</Link>
        </div>
    );
};

export default PledgeSuccessPage;
