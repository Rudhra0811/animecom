import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { mockPosters } from '../data/mockPosters';

const ProductList = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Anime Posters
            </Typography>
            <Grid container spacing={3}>
                {mockPosters.map((poster) => (
                    <Grid item key={poster.id} xs={12} sm={6} md={4}>
                        <ProductCard {...poster} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;