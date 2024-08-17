import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Pagination, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { mockPosters } from '../data/mockPosters';

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPosters, setFilteredPosters] = useState([]);
    const postersPerPage = 6;

    useEffect(() => {
        const results = mockPosters.filter(poster =>
            poster.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosters(results);
        setCurrentPage(1);
    }, [searchTerm]);

    const indexOfLastPoster = currentPage * postersPerPage;
    const indexOfFirstPoster = indexOfLastPoster - postersPerPage;
    const currentPosters = filteredPosters.slice(indexOfFirstPoster, indexOfLastPoster);

    const paginate = (event, value) => setCurrentPage(value);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Anime Posters
            </Typography>
            <TextField
                fullWidth
                label="Search posters"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 4 }}
            />
            <Grid container spacing={3}>
                {currentPosters.map((poster) => (
                    <Grid item key={poster.id} xs={12} sm={6} md={4}>
                        <ProductCard {...poster} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(filteredPosters.length / postersPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default ProductList;