import React from 'react';
import { getAuth } from 'firebase/auth';
import UserService from '../services/UserService';
import { ProductData } from '../types';

interface SetLatestProductsParameters {
    setProducts: React.Dispatch<React.SetStateAction<ProductData<string>[] | null>>
    setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isMounted: boolean
}

class ProductsPresenter {
    static async setProducts(
        { setProducts, setProductsLoading, isMounted }: SetLatestProductsParameters,
    ) {
        try {
            const { currentUser } = getAuth();
            if (!currentUser) {
                throw new Error('User missing');
            }

            const { products } = await UserService.get(currentUser.uid);
            if (isMounted) {
                if (products) {
                    setProducts(products);
                }
                setProductsLoading(false);
            }
        } catch (_error) {
            if (isMounted) setProductsLoading(false);
        }
    }
}

export default ProductsPresenter;
