import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ProductPreview from '../components/ProductPreview';
import CONSTANTS from '../constants';
import { UserState, ProductData } from '../types';
import LandingPresenter from '../presenters/landing';

const LandingPage: React.FC<{ user: UserState }> = ({ user }) => {
    const [products, setProducts] = useState<ProductData<string>[] | null>(null);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        LandingPresenter.setLatestProducts({ setProducts, setProductsLoading });
    }, []);

    // Map latest products to product preview element
    let latestProductElements;
    if (products) {
        // eslint-disable-next-line consistent-return
        latestProductElements = products.map((product) => {
            const { title, creatorName, productUID } = product;
            if (title && creatorName && productUID) {
                return (
                    <ProductPreview
                        key={productUID}
                        title={title}
                        creator={creatorName}
                        id={productUID}
                    />
                );
            }
        });
    }

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
                <div className="product-container">
                    { productsLoading
                        && <CircularProgress /> }
                    { !productsLoading
                        && (
                            latestProductElements
                            || <p>No one has created a product idea yet. Be the first?</p>
                        ) }
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
