import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface ProductPreviewProps {
    title: string
    creator: string
    id: string
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ title, creator, id }) => {
    return (
        <Card className="card__product-preview">
            <CardContent>
                <h3>{title}</h3>
                <div>{creator}</div>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link to={`/products/${id}`}>Find Out More</Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductPreview;
