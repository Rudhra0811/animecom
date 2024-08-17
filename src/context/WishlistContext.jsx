import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
            if (storedWishlist) {
                setWishlist(JSON.parse(storedWishlist));
            }
        } else {
            setWishlist([]);
        }
    }, [user]);

    const addToWishlist = (product) => {
        if (user) {
            const updatedWishlist = [...wishlist, product];
            setWishlist(updatedWishlist);
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = (productId) => {
        if (user) {
            const updatedWishlist = wishlist.filter(item => item.id !== productId);
            setWishlist(updatedWishlist);
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};