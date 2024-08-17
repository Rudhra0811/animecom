import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Header = () => {
    const { cart, cartTotal } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.key === 'Enter') {
            navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Anime Poster Marketplace
                    </Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <SearchBar value={searchTerm} onChange={handleSearch} />
                </Box>
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