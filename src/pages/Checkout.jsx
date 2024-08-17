import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, TextField, Button, Stepper, Step, StepLabel, Box } from '@mui/material';
import { clearCart } from '../store/cartSlice';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateShippingDetails = () => {
        const newErrors = {};
        if (!shippingDetails.fullName) newErrors.fullName = 'Full name is required';
        if (!shippingDetails.address) newErrors.address = 'Address is required';
        if (!shippingDetails.city) newErrors.city = 'City is required';
        if (!shippingDetails.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!shippingDetails.country) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePaymentDetails = () => {
        const newErrors = {};
        if (!paymentDetails.cardName) newErrors.cardName = 'Name on card is required';
        if (!paymentDetails.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!paymentDetails.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!paymentDetails.cvv) newErrors.cvv = 'CVV is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        let isValid = false;
        if (activeStep === 0) {
            isValid = validateShippingDetails();
        } else if (activeStep === 1) {
            isValid = validatePaymentDetails();
        } else {
            isValid = true;
        }

        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleShippingChange = (event) => {
        setShippingDetails({ ...shippingDetails, [event.target.name]: event.target.value });
    };

    const handlePaymentChange = (event) => {
        setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Order submitted:', { shippingDetails, paymentDetails, cart });
        dispatch(clearCart());
        navigate('/order-confirmation');
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="fullName"
                                    label="Full Name"
                                    fullWidth
                                    value={shippingDetails.fullName}
                                    onChange={handleShippingChange}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    value={shippingDetails.address}
                                    onChange={handleShippingChange}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="city"
                                    label="City"
                                    fullWidth
                                    value={shippingDetails.city}
                                    onChange={handleShippingChange}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="postalCode"
                                    label="Postal Code"
                                    fullWidth
                                    value={shippingDetails.postalCode}
                                    onChange={handleShippingChange}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    value={shippingDetails.country}
                                    onChange={handleShippingChange}
                                    error={!!errors.country}
                                    helperText={errors.country}
                                />
                            </Grid>
                        </Grid>
                    </form>
                );
            case 1:
                return (
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="cardName"
                                    label="Name on Card"
                                    fullWidth
                                    value={paymentDetails.cardName}
                                    onChange={handlePaymentChange}
                                    error={!!errors.cardName}
                                    helperText={errors.cardName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="cardNumber"
                                    label="Card Number"
                                    fullWidth
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentChange}
                                    error={!!errors.cardNumber}
                                    helperText={errors.cardNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="expiryDate"
                                    label="Expiry Date"
                                    fullWidth
                                    value={paymentDetails.expiryDate}
                                    onChange={handlePaymentChange}
                                    error={!!errors.expiryDate}
                                    helperText={errors.expiryDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="cvv"
                                    label="CVV"
                                    fullWidth
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentChange}
                                    error={!!errors.cvv}
                                    helperText={errors.cvv}
                                />
                            </Grid>
                        </Grid>
                    </form>
                );
            case 2:
                return (
                    <div>
                        <Typography variant="h6" gutterBottom>Order Summary</Typography>
                        {cart.items.map((item) => (
                            <Typography key={item.id}>
                                {item.title} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        ))}
                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                            Total: ${cart.total.toFixed(2)}
                        </Typography>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <Typography variant="h5" align="center">
                        Thank you for your order.
                    </Typography>
                ) : (
                    <>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Checkout;