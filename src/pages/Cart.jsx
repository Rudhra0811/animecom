import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart, removeFromCart, clearCart } from '../store/cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncreaseQuantity = (item) => {
        dispatch(addToCart({ ...item, quantity: 1 }));
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart({ ...item, quantity: -1 }));
        } else {
            dispatch(removeFromCart(item.id));
        }
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Your Cart
            </Typography>
            {cart.items.length === 0 ? (
                <Typography variant="h5">Your cart is empty</Typography>
            ) : (
                <>
                    {cart.items.map((item) => (
                        <Paper key={item.id} elevation={3} sx={{ mb: 2, p: 2 }}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box display="flex" alignItems="center">
                                        <IconButton onClick={() => handleDecreaseQuantity(item)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                        <IconButton onClick={() => handleIncreaseQuantity(item)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="body1">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4">
                            Total: ${cart.total.toFixed(2)}
                        </Typography>
                        <Box>
                            <Button variant="outlined" color="secondary" onClick={handleClearCart} sx={{ mr: 2 }}>
                                Clear Cart
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleCheckout}>
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Cart;