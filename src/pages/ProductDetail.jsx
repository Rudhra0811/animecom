import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, Paper, TextField, Snackbar } from '@mui/material';
import { mockPosters } from '../data/mockPosters';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const foundProduct = mockPosters.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/products');
        }
    }, [id, navigate]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setOpenSnackbar(true);
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TextField
                                type="number"
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                InputProps={{ inputProps: { min: 1 } }}
                                sx={{ width: 100, mr: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                size="large"
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={`Added ${quantity} ${product.title} to cart`}
            />
        </Container>
    );
};

export default ProductDetail;