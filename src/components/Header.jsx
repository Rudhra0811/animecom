import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cart, cartTotal } = useCart();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Anime Poster Marketplace
                    </Link>
                </Typography>
                <Button color="inherit" component={Link} to="/products">
                    Products
                </Button>
                <IconButton color="inherit" component={Link} to="/cart" aria-label="cart">
                    <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Typography variant="body1" sx={{ ml: 2 }}>
                    ${cartTotal.toFixed(2)}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;