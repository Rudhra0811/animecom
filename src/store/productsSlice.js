import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchPosters = createAsyncThunk(
    'products/fetchPosters',
    async (search = '') => {
        const response = await api.getPosters(search);
        return response;
    }
);

export const fetchPosterDetails = createAsyncThunk(
    'products/fetchPosterDetails',
    async (id) => {
        const response = await api.getPoster(id);
        return response;
    }
);

export const addReview = createAsyncThunk(
    'products/addReview',
    async ({ posterId, review }) => {
        const response = await api.addReview(posterId, review);
        return { posterId, review };
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        currentPoster: null,
        recommendations: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPosters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPosterDetails.fulfilled, (state, action) => {
                state.currentPoster = action.payload;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                if (state.currentPoster && state.currentPoster.id === action.payload.posterId) {
                    state.currentPoster.reviews.push(action.payload.review);
                }
            });
    },
});

export default productsSlice.reducer;