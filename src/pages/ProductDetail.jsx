import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Product Details
            </Typography>
            <Typography variant="body1">
                Showing details for product ID: {id}
            </Typography>
        </Container>
    );
};

export default ProductDetail;