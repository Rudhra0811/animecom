import { mockPosters } from '../data/mockPosters';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const calculateSimilarity = (poster1, poster2) => {
    const genres1 = new Set(poster1.genres);
    const genres2 = new Set(poster2.genres);
    const intersection = new Set([...genres1].filter(x => genres2.has(x)));
    return intersection.size / Math.max(genres1.size, genres2.size);
};

export const api = {
    getPosters: async (search = '') => {
        await delay(500);
        return mockPosters.filter(poster =>
            poster.title.toLowerCase().includes(search.toLowerCase())
        );
    },

    getPoster: async (id) => {
        await delay(300);
        return mockPosters.find(poster => poster.id === parseInt(id));
    },

    getRecommendations: async (posterId) => {
        await delay(400);
        const currentPoster = mockPosters.find(poster => poster.id === parseInt(posterId));
        if (!currentPoster) return [];

        return mockPosters
            .filter(poster => poster.id !== parseInt(posterId))
            .map(poster => ({
                ...poster,
                similarity: calculateSimilarity(currentPoster, poster)
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);
    },

    addReview: async (posterId, review) => {
        await delay(300);
        const poster = mockPosters.find(p => p.id === parseInt(posterId));
        if (poster) {
            poster.reviews = [...(poster.reviews || []), review];
            return { success: true, review };
        }
        throw new Error('Poster not found');
    }
};