import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, Paper, TextField, Rating, Divider, List, ListItem, ListItemText } from '@mui/material';
import { mockPosters } from '../data/mockPosters';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const foundProduct = mockPosters.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setReviews(foundProduct.reviews || []);
        } else {
            navigate('/products');
        }
    }, [id, navigate]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`Added ${quantity} ${product.title} poster(s) to cart`);
    };

    const handleReviewSubmit = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <motion.img
                                src={product.image}
                                alt={product.title}
                                style={{ width: '100%', height: 'auto' }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
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

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>Reviews</Typography>
                    {user ? (
                        <ReviewForm onSubmit={handleReviewSubmit} />
                    ) : (
                        <Typography>Please log in to leave a review.</Typography>
                    )}
                    <List>
                        {reviews.map((review, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body1" color="text.primary">
                                                    {review.user}
                                                </Typography>
                                                <Rating value={review.rating} readOnly sx={{ ml: 1 }} />
                                            </React.Fragment>
                                        }
                                        secondary={review.comment}
                                    />
                                </ListItem>
                                {index < reviews.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </motion.div>
        </Container>
    );
};

export default ProductDetail;