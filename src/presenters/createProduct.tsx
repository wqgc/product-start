import { ProductData } from '../types';

type SetErrors = React.Dispatch<React.SetStateAction<ProductData<boolean>>>

class CreateProductPresenter {
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
            if (description.length > 2_000) {
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
