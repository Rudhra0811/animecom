import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const ProductList = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Anime Posters
            </Typography>
            <Grid container spacing={3}>
            </Grid>
        </Container>
    );
};

export default ProductList;