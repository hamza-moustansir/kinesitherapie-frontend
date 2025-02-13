import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SalleService from './salleService';

const initialState = {
  salles: [],
  currentSalle: null,
  status: 'idle',
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  }
};

// Action pour récupérer les salles
export const fetchSalles = createAsyncThunk('salles/fetchSalles', async ({ page, size }) => {
  const response = await SalleService.getAllSalles(page, size);
  return response;
});

export const createSalle = createAsyncThunk(
  'salles/create',
  async (salleData, thunkAPI) => {
    try {
      return await SalleService.createSalle(salleData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateSalle = createAsyncThunk(
  'salles/update',
  async ({ id, salleData }, thunkAPI) => {
    try {
      return await SalleService.updateSalle(id, salleData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteSalle = createAsyncThunk(
  'salles/delete',
  async (id, thunkAPI) => {
    try {
      await SalleService.deleteSalle(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const salleSlice = createSlice({
  name: 'salles',
  initialState: {
    salles: [],
    status: 'idle',
    error: null,
    pagination: { page: 0, size: 10, totalPages: 1 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalles.fulfilled, (state, action) => {
        state.salles = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSalles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSalle.fulfilled, (state, action) => {
        state.salles = state.salles.filter(salle => salle.id !== action.payload);
      });
  },
});

export const { setCurrentSalle } = salleSlice.actions;
export default salleSlice.reducer;
