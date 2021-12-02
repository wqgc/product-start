import { getAuth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { ProductData, AlertState } from '../types';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import CONSTANTS from '../constants';

type SetErrors = React.Dispatch<React.SetStateAction<ProductData<boolean>>>

interface SubmitParameters {
    data: ProductData<string>
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
    setErrors: SetErrors
    navigate: NavigateFunction
}

class CreateProductPresenter {
    static async formSubmit({
        data, setAlert, setErrors, navigate,
    }: SubmitParameters): Promise<void> {
        if (setAlert !== null) {
            if (this.isFormValid(data, setErrors)) {
                try {
                    const { currentUser } = getAuth();
                    if (currentUser) {
                        const product = {
                            ...data,
                            creatorName: currentUser.displayName,
                            creatorUID: currentUser.uid,
                        } as ProductData<string>;

                        const newProduct = await ProductService.create(product);
                        await ProductService.updateLatestProducts(newProduct);

                        // Update user data to store user's current products
                        const userData = await UserService.get(currentUser.uid);
                        userData.products.push({
                            ...product, productUID: newProduct.productUID,
                        });
                        await UserService.updateDB(currentUser.uid, userData);
                        navigate('/products', { replace: false });
                        setAlert({ message: 'Created product campaign!', type: 'success' });
                    } else {
                        throw new Error('Missing current user.');
                    }
                } catch (error: any) {
                    setAlert({ message: error.message, type: 'error' });
                }
            } else {
                setAlert({ message: 'Form data invalid.', type: 'error' });
            }
        }
    }

    static isFormValid(data: ProductData<string>, setErrors: SetErrors): boolean {
        const { title, goal, description } = data;

        const errors = {
            title: false,
            goal: false,
            description: false,
        };

        if (title && description && goal) {
            if (title.length < 3 || title.length > 32) {
                errors.title = true;
            }
            if (goal.length > 12 || !/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/.test(goal)) {
                errors.goal = true;
            }
            if (description.length > CONSTANTS.PRODUCT_DESCRIPTION_MAXLENGTH) {
                errors.description = true;
            }
            setErrors(errors);

            if (errors.title || errors.goal || errors.description) {
                return false;
            }
            return true;
        }

        return false;
    }
}

export default CreateProductPresenter;
