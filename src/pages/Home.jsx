import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
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
                Browse Posters
            </Button>
        </Container>
    );
};

export default Home;