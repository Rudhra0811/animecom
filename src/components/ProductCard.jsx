import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ProductCard = ({ id, title, image, price, description }) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { user } = useAuth();
    const isInWishlist = wishlist.some(item => item.id === id);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(id);
        } else {
            addToWishlist({ id, title, image, price, description });
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
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
                    {user && (
                        <IconButton onClick={handleWishlistToggle} color="primary">
                            {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    )}
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default ProductCard;