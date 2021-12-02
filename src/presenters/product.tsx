import React from 'react';
import { getAuth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import { ProductData, AlertState } from '../types';
import CONSTANTS from '../constants';

interface SetProductParameters {
    id: string
    setProduct: React.Dispatch<React.SetStateAction<ProductData<string> | null>>
    setProductLoading: React.Dispatch<React.SetStateAction<boolean>>
    navigate: NavigateFunction
}

type SetDescriptionError = React.Dispatch<React.SetStateAction<boolean>>

interface ChangeProductParameters {
    id: string | undefined
    data: ProductData<string>
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
    navigate: NavigateFunction
    setDescriptionError?: SetDescriptionError
}

class ProductPresenter {
    static async setProduct({
        id, setProduct, setProductLoading, navigate,
    }: SetProductParameters) {
        try {
            const product = await ProductService.getProduct(id);
            if (product) {
                setProduct(product);
            }
            setProductLoading(false);
        } catch (error) {
            navigate('/404', { replace: false });
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

    static isUpdateValid(description: string, setDescriptionError: SetDescriptionError): boolean {
        if (description.length > CONSTANTS.PRODUCT_DESCRIPTION_MAXLENGTH) {
            setDescriptionError(true);
            return false;
        }
        setDescriptionError(false);
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
