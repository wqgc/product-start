import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { UserState, Pledge } from '../types';
import PledgesPresenter from '../presenters/pledges';
import ProductPreview from '../components/ProductPreview';

const PledgesPage: React.FC<{ user: UserState }> = ({ user }) => {
    const [pledges, setPledges] = useState<Pledge[] | null>(null);
    const [pledgesLoading, setPledgesLoading] = useState(true);

    // Get and set the user's pledges
    useEffect(() => {
        let isMounted = true;
        if (!pledges) {
            PledgesPresenter.setPledges({
                setPledges, setPledgesLoading, isMounted,
            });
        }
        return () => { isMounted = false; };
    }, [user]);

    // Map pledges to product preview element
    let pledgeElements;
    if (pledges) {
        // eslint-disable-next-line consistent-return
        pledgeElements = pledges.map((pledge) => {
            const { title, creatorName, productUID } = pledge.product;
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
            <h2>My Pledges</h2>
            <div className="product-container">
                { pledgesLoading
                    && <CircularProgress /> }
                { !pledgesLoading
                    && (
                        pledgeElements && pledgeElements.length > 0
                            ? pledgeElements
                            : <p>No pledges yet.</p>
                    ) }
            </div>
        </div>
    );
};

export default PledgesPage;
