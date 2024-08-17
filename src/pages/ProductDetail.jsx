import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Grid, Button, Box, Paper, TextField, Rating, Divider, List, ListItem, ListItemText } from '@mui/material';
import { fetchPosterDetails, addReview } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import ReviewForm from '../components/ReviewForm';
import RecommendationSection from '../components/RecommendationSection';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentPoster, status, error } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchPosterDetails(id));
    }, [dispatch, id]);

    const handleAddToCart = (quantity) => {
        dispatch(addToCart({ ...currentPoster, quantity }));
        alert(`Added ${quantity} ${currentPoster.title} poster(s) to cart`);
    };

    const handleReviewSubmit = (review) => {
        dispatch(addReview({ posterId: id, review }));
    };

    if (status === 'loading') return <Typography>Loading...</Typography>;
    if (status === 'failed') return <Typography>Error: {error}</Typography>;
    if (!currentPoster) return null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <AnimatePresence>
                <motion.div
                    key={currentPoster.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <motion.img
                                    src={currentPoster.image}
                                    alt={currentPoster.title}
                                    style={{ width: '100%', height: 'auto' }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" component="h1" gutterBottom>
                                    {currentPoster.title}
                                </Typography>
                                <Typography variant="h4" color="primary" gutterBottom>
                                    ${currentPoster.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {currentPoster.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        type="number"
                                        label="Quantity"
                                        defaultValue={1}
                                        InputProps={{ inputProps: { min: 1 } }}
                                        sx={{ width: 100, mr: 2 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddToCart(1)}
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
                            {currentPoster.reviews && currentPoster.reviews.map((review, index) => (
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
                                    {index < currentPoster.reviews.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>

                    <RecommendationSection currentPosterId={currentPoster.id} />
                </motion.div>
            </AnimatePresence>
        </Container>
    );
};

export default ProductDetail;