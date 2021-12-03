import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateProductPresenter from '../../presenters/createProduct';
import AlertContext from '../../utils/alertContext';
import { ProductData } from '../../types';

const CreatePage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);
    const [title, setTitle] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState<ProductData<string>>({
        title,
        goal,
        description,
    });
    const [errors, setErrors] = useState<ProductData<boolean>>({
        title: false,
        goal: false,
        description: false,
    });
    const [createDisabled, setCreateDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const newData = {
            title: title.trim(),
            goal: goal.trim(),
            description,
        };
        setData(newData);

        const dataIsValid = CreateProductPresenter.isFormValid(newData, setErrors);
        setCreateDisabled(!dataIsValid);
    }, [title, goal, description]);

    const helperText = {
        title: 'Must be between 3-32 characters',
        goal: 'Please input a valid USD amount less than 12 numbers long',
        description: 'Tell us about your product within 2,000 words',
    };

    return (
        <div>
            <h2>Create Campaign</h2>
            <div className="form-container">
                <TextField
                    id="title-input"
                    helperText={helperText.title}
                    label="Campaign Title"
                    error={errors.title}
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    required
                />
                <TextField
                    id="goal-input"
                    helperText={helperText.goal}
                    label="Funding Goal in USD"
                    error={errors.goal}
                    value={goal}
                    onChange={({ target }) => setGoal(target.value)}
                    required
                />
                <TextField
                    id="description-input"
                    helperText={helperText.description}
                    label="Campaign Description"
                    multiline
                    rows={8}
                    error={errors.description}
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <Button
                    variant="contained"
                    onClick={
                        () => CreateProductPresenter.formSubmit(
                            {
                                data, setAlert, setErrors, navigate,
                            },
                        )
                    }
                    disabled={createDisabled}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default CreatePage;
