import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ProductPreview from '../components/ProductPreview';
import CONSTANTS from '../constants';
import { UserState } from '../types';

const LandingPage: React.FC<{ user: UserState }> = ({ user }) => {
    return (
        <div>
            <section>
                <h2>What is {CONSTANTS.SITE_NAME}?</h2>
                <p>
                    {CONSTANTS.SITE_NAME} is a place for entrepreneurs to share product ideas
                     and receive initial funding from interested users. Turn your dream product
                     into a reality. Or, as a user, find and support a product that really matters
                     to you!
                </p>
                <p>
                    <strong>This is a demo site for presentational purposes.</strong>
                </p>
                { !user.signedIn
                    && (
                        <p>
                        Sounds interesting? <Link to="/register">Sign up today!</Link>
                        </p>
                    )}
            </section>
            <Divider /><br />
            <section>
                <h2>Discover New Ideas!</h2>
                <div className="product-previews">
                    <ProductPreview title="prod1" creator="creator1" id="" />
                    <ProductPreview title="prod2" creator="creator2" id="" />
                    <ProductPreview title="prod3" creator="creator3" id="" />
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
