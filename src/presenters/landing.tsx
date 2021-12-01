import React from 'react';
import ProductService from '../services/ProductService';
import { ProductData } from '../types';

interface SetLatestProductsParameters {
    setProducts: React.Dispatch<React.SetStateAction<ProductData<string>[] | null>>
    setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isMounted: boolean
}

class LandingPresenter {
    static async setLatestProducts(
        { setProducts, setProductsLoading, isMounted }: SetLatestProductsParameters,
    ) {
        try {
            const { products } = await ProductService.getLatestProducts();
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

export default LandingPresenter;
