import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams } from 'react-router-dom';
import moneyFormatter from 'money-formatter';
import ProductPresenter from '../../presenters/product';
import { ProductData, Pledge, UserState } from '../../types';

const ProductPage: React.FC<{ user: UserState }> = ({ user }) => {
    const [userPledgeData, setUserPledgeData] = useState<Pledge | null>(null);
    const [product, setProduct] = useState<ProductData<string> | null>(null);
    const [productLoading, setProductLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const setData = async () => {
            if (id && !product) {
                if (user && user.signedIn === true) {
                    await ProductPresenter.setPledgeData({
                        setUserPledgeData, productId: id, isMounted,
                    });
                }
                await ProductPresenter.setProduct({
                    id, setProduct, setProductLoading, navigate, isMounted,
                });
            }
        };
        setData();
        return () => { isMounted = false; };
    }, []);

    return (
        <div>
            { productLoading
                && <CircularProgress /> }
            { !productLoading && product
                && (
                    <>
                        <h2>{product.title}</h2>

                        <div className="details">
                            <div><em>By {product.creatorName}</em></div>
                            <div><strong>Goal:</strong> {moneyFormatter.format('USD', product.goal)}</div>
                            <div><strong>Raised so far:</strong> {moneyFormatter.format('USD', product.currentFunds)}</div>
                        </div>

                        <br />
                        <Divider />

                        <p>{product.description}</p>

                        { (user?.signedIn && user?.uid !== product.creatorUID)
                            && (
                                <>
                                    <Divider />
                                    <br />

                                    <h3>Pledge to {product.title}</h3>
                                    { userPledgeData
                                        ? <p>You've pledged {moneyFormatter.format('USD', userPledgeData.amount)}!</p>
                                        : (
                                            <>
                                                <p>pledge form here</p>
                                                <Button variant="contained" onClick={() => {}}>
                                                    Pledge
                                                </Button>
                                            </>
                                        )}
                                </>
                            )}

                        { user?.uid === product.creatorUID
                            && (
                                <>
                                    <Divider />
                                    <br />

                                    <Button variant="contained" onClick={() => navigate('edit', { replace: false })}>
                                        Edit Campaign Details
                                    </Button>
                                </>
                            )}

                    </>
                )}
        </div>
    );
};

export default ProductPage;
