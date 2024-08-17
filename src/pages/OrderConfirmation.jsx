import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Thank You for Your Order!
                </Typography>
                <Typography variant="body1" paragraph>
                    Your order has been successfully placed. You will receive a confirmation email shortly.
                </Typography>
                <Typography variant="body1" paragraph>
                    Order number: {Math.floor(Math.random() * 1000000)}
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 2 }}>
                    Continue Shopping
                </Button>
            </Paper>
        </Container>
    );
};

export default OrderConfirmation;