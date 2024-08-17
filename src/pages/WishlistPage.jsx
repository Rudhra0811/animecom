import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
    const { wishlist } = useWishlist();

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Your Wishlist
            </Typography>
            {wishlist.length === 0 ? (
                <Typography>Your wishlist is empty.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {wishlist.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <ProductCard {...product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default WishlistPage;