import React from 'react';
import { getAuth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import { ProductData, AlertState, Pledge } from '../types';
import CONSTANTS from '../constants';

interface SetProductParameters {
    id: string
    setProduct: React.Dispatch<React.SetStateAction<ProductData<string> | null>>
    setProductLoading: React.Dispatch<React.SetStateAction<boolean>>
    navigate: NavigateFunction
    isMounted: boolean
}

type SetError = React.Dispatch<React.SetStateAction<boolean>>

interface SetUserPledgeDataParameters {
    setUserPledgeData: React.Dispatch<React.SetStateAction<Pledge | null>>
    productId: string
    isMounted: boolean
}

interface ChangeProductParameters {
    id: string | undefined
    data: ProductData<string>
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
    navigate: NavigateFunction
    setDescriptionError?: SetError
}

interface SubmitPledgeParameters {
    id: string | undefined
    pledgeAmount: string
    setPledgeError: SetError
    setSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>
}

class ProductPresenter {
    static async setProduct({
        id, setProduct, setProductLoading, navigate, isMounted,
    }: SetProductParameters) {
        try {
            const product = await ProductService.getProduct(id);
            if (isMounted) {
                if (product) {
                    setProduct(product);
                }
                setProductLoading(false);
            }
        } catch (error) {
            navigate('/404', { replace: false });
        }
    }

    static async setPledgeData({
        setUserPledgeData, productId, isMounted,
    }: SetUserPledgeDataParameters) {
        const { currentUser } = getAuth();
        if (currentUser) {
            const { pledges } = await UserService.get(currentUser.uid);
            let pledge;

            // Get user's pledge for this product
            for (let i = 0; i < pledges.length; i += 1) {
                if (pledges[i].product.productUID === productId) {
                    pledge = pledges[i];
                    break;
                }
            }

            if (pledge && isMounted) {
                setUserPledgeData(pledge);
            }
        }
    }

    static async submitProductUpdate({
        id, data, setAlert, navigate, setDescriptionError,
    }: ChangeProductParameters) {
        // Since you can only update the description, and the description isn't
        // visible in product previews, we don't have to worry about syncing updates
        if (id !== undefined && setAlert !== null && setDescriptionError) {
            if (this.isUpdateValid(data.description, setDescriptionError)) {
                try {
                    await ProductService.updateProduct(id, data);
                    setAlert({ message: 'Successfully updated product!', type: 'success' });
                    navigate(`/products/${id}`, { replace: false });
                } catch (error: any) {
                    setAlert({ message: error.message, type: 'error' });
                }
            } else {
                setAlert({ message: 'Form data invalid.', type: 'error' });
            }
        }
    }

    static isUpdateValid(description: string, setDescriptionError: SetError): boolean {
        if (description.length > CONSTANTS.PRODUCT_DESCRIPTION_MAXLENGTH) {
            setDescriptionError(true);
            return false;
        }
        setDescriptionError(false);
        return true;
    }

    static async submitPledge({
        id, pledgeAmount, setPledgeError, setSubmitLoading,
    }: SubmitPledgeParameters) {
        if (id !== undefined && this.isPledgeValid(pledgeAmount, setPledgeError)) {
            setSubmitLoading(true);
            await UserService.createCheckoutSession(id, pledgeAmount);
            setSubmitLoading(false);
        }
    }

    static isPledgeValid(pledgeAmount: string, setPledgeError: SetError): boolean {
        if (!pledgeAmount) {
            setPledgeError(false);
            return false;
        }
        if (pledgeAmount.length > 12 || !/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/.test(pledgeAmount)) {
            setPledgeError(true);
            return false;
        }
        setPledgeError(false);
        return true;
    }

    static async deleteProduct({
        id, data, setAlert, navigate,
    }: ChangeProductParameters) {
        if (id !== undefined && setAlert !== null) {
            try {
                // Delete product
                await ProductService.delete(id);
                const { currentUser } = getAuth();
                if (currentUser) {
                    const userData = await UserService.get(currentUser.uid);
                    // Remove product from user
                    userData.products = userData.products.filter(
                        (product: ProductData<string>) => product.productUID !== id,
                    );
                    await UserService.updateDB(currentUser.uid, userData);
                    // Remove product from aggregate
                    await ProductService.updateLatestProducts({ ...data, productUID: id }, true);

                    navigate('/products', { replace: false });
                    setAlert({ message: 'Deleted product campaign.', type: 'success' });
                } else {
                    throw new Error('Missing current user.');
                }
            } catch (error: any) {
                setAlert({ message: error.message, type: 'error' });
            }
        }
    }
}

export default ProductPresenter;
