import React, { useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        onSubmit({ rating, comment, user: user.username });
        setRating(0);
        setComment('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography component="legend">Rate this poster</Typography>
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Your review"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Review
            </Button>
        </Box>
    );
};

export default ReviewForm;