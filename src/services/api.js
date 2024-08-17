import { mockPosters } from '../data/mockPosters';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    return mockPosters
      .filter(poster => poster.id !== parseInt(posterId))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  },

  addReview: async (posterId, review) => {
    await delay(300);
    const poster = mockPosters.find(p => p.id === parseInt(posterId));
    if (poster) {
      poster.reviews = [...(poster.reviews || []), review];
      return { success: true };
    }
    throw new Error('Poster not found');
  }
};