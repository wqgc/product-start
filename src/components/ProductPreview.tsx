import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
                <h3><Link to={`/products/${id}`}>{title}</Link></h3>
                <div>By {creator}</div>
            </CardContent>
        </Card>
    );
};

export default ProductPreview;
