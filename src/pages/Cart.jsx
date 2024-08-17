import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Typography, Grid, Paper, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart();

    const handleIncreaseQuantity = (item) => {
        addToCart(item, 1);
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            addToCart(item, -1);
        } else {
            removeFromCart(item.id);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Your Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="h5">Your cart is empty</Typography>
            ) : (
                <>
                    {cart.map((item) => (
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
                                    <IconButton onClick={() => removeFromCart(item.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4">
                            Total: ${cartTotal.toFixed(2)}
                        </Typography>
                        <Box>
                            <Button variant="outlined" color="secondary" onClick={clearCart} sx={{ mr: 2 }}>
                                Clear Cart
                            </Button>
                            <Button variant="contained" color="primary" component={Link} to="/checkout">
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