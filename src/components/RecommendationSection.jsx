import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { api } from '../services/api';
import { motion } from 'framer-motion';

const RecommendationSection = ({ currentPosterId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await api.getRecommendations(currentPosterId);
                setRecommendations(data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [currentPosterId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                You might also like
            </Typography>
            <Grid container spacing={3}>
                {recommendations.map((poster) => (
                    <Grid item key={poster.id} xs={12} sm={6} md={4}>
                        <motion.div variants={itemVariants}>
                            <ProductCard {...poster} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
};

export default RecommendationSection;