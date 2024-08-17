import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockPosters } from '../data/mockPosters';

const Home = () => {
    const featuredProduct = mockPosters[0];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Anime Poster Marketplace
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Discover amazing posters from your favorite anime series!
                </Typography>
                <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Browse All Posters
                </Button>
            </Box>

            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Featured Product
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <ProductCard {...featuredProduct} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;