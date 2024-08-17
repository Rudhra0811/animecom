import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';

const ProductList = ({ initialSearch, setLoading }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        const fetchPosters = async () => {
            setLoading(true);
            try {
                const data = await api.getPosters(searchTerm);
                setPosters(data);
            } catch (error) {
                console.error('Error fetching posters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosters();
    }, [searchTerm, setLoading]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Anime Posters
            </Typography>
            <SearchBar value={searchTerm} onChange={handleSearch} />
            <Box sx={{ mt: 4 }}>
                <AnimatePresence>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        <Grid container spacing={3}>
                            {posters.map((poster) => (
                                <Grid item key={poster.id} xs={12} sm={6} md={4}>
                                    <motion.div
                                        variants={{
                                            hidden: { y: 20, opacity: 0 },
                                            visible: { y: 0, opacity: 1 }
                                        }}
                                    >
                                        <ProductCard {...poster} />
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Container>
    );
};

export default ProductList;