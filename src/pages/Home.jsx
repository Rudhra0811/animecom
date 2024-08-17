import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const Home = ({ setLoading }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            setLoading(true);
            try {
                const allPosters = await api.getPosters();
                const featured = allPosters.sort(() => 0.5 - Math.random()).slice(0, 3);
                setFeaturedProducts(featured);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, [setLoading]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
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
                </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Featured Products
                </Typography>
                <Grid container spacing={3}>
                    {featuredProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;