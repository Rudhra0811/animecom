import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, image, price, description }) => {
    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="450"
                image={image}
                alt={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                    ${price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/product/${id}`}>Learn More</Button>
                <Button size="small" color="primary">Add to Cart</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;