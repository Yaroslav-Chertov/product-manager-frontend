import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

export const fetchProducts = createAsyncThunk<Product[]>('products/fetch', async () => {
    const response = await axios.get<Product[]>('https://78d12f82ca58fcf6.mokky.dev/orders');
    return response.data;
});

export const addProduct = createAsyncThunk<Product, Omit<Product, 'id'>>('products/add', async (newProduct) => {
    const response = await axios.post<Product>('https://78d12f82ca58fcf6.mokky.dev/orders', newProduct);
    return response.data;
});

export const updateProduct = createAsyncThunk<Product, Product>('products/update', async (product) => {
    const response = await axios.patch<Product>(`https://78d12f82ca58fcf6.mokky.dev/orders/${product.id}`, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk<number, number>('products/delete', async (id) => {
    await axios.delete(`https://78d12f82ca58fcf6.mokky.dev/orders/${id}`);
    return id;
});

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    },
});

export const productsReducer = productsSlice.reducer;
