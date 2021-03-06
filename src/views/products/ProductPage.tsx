import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import moneyFormatter from 'money-formatter';
import ProductPresenter from '../../presenters/product';
import { ProductData, Pledge, UserState } from '../../types';

const ProductPage: React.FC<{ user: UserState }> = ({ user }) => {
    const [userPledgeData, setUserPledgeData] = useState<Pledge | null>(null);
    const [product, setProduct] = useState<ProductData<string> | null>(null);
    const [pledge, setPledge] = useState('');
    const [pledgeError, setPledgeError] = useState(false);
    const [pledgeDisabled, setPledgeDisabled] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    // Set initial data
    useEffect(() => {
        let isMounted = true;
        const setData = async () => {
            if (id) {
                if (user && user.signedIn === true && !userPledgeData) {
                    await ProductPresenter.setPledgeData({
                        setUserPledgeData, productId: id, isMounted,
                    });
                }
                if (!product) {
                    await ProductPresenter.setProduct({
                        id, setProduct, setProductLoading, navigate, isMounted,
                    });
                }
            }
        };
        setData();
        return () => { isMounted = false; };
    }, [user]);

    // Check pledge validity
    useEffect(() => {
        const dataIsValid = ProductPresenter.isPledgeValid(pledge, setPledgeError);
        setPledgeDisabled(!dataIsValid);
    }, [pledge]);

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
                                            <div>
                                                <TextField
                                                    id="pledge-input"
                                                    helperText="Please input a valid USD amount less than 12 numbers long"
                                                    label="Pledge Amount in USD"
                                                    error={pledgeError}
                                                    value={pledge}
                                                    onChange={(
                                                        { target },
                                                    ) => setPledge(target.value)}
                                                    required
                                                />
                                                <br />
                                                <LoadingButton
                                                    variant="contained"
                                                    loading={submitLoading}
                                                    onClick={
                                                        () => ProductPresenter.submitPledge({
                                                            id,
                                                            pledgeAmount: pledge.replace(/,/g, ''),
                                                            setPledgeError,
                                                            setSubmitLoading,
                                                        })
                                                    }
                                                    disabled={pledgeDisabled}
                                                >
                                                    Pledge
                                                </LoadingButton>
                                            </div>
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
