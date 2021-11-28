import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../constants';

const LandingPage: React.FC = () => {
    return (
        <div>
            <section>
                <h2>Discover New Ideas!</h2>
                <p>
                    A list of products will go here.
                </p>
            </section>
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
                <p>
                    Sounds interesting? <Link to="/register">Sign up today!</Link>
                </p>
            </section>
        </div>
    );
};

export default LandingPage;
