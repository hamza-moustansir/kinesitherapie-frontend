import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './userService';

const initialState = {
  users: [],
  currentUser: null,
  status: 'idle',
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  }
};

// Action pour récupérer les utilisateurs
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, size }) => {
    const response = await UserService.getAllUsers(page, size);
    return response;
  }
);

// ✅ Correction de `createUser`
export const createUser = createAsyncThunk(
  'users/create',
  async (userData, thunkAPI) => {
    try {
      const newUser = await UserService.createUser(userData);
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, userData }, thunkAPI) => {
    try {
      return await UserService.updateUser(id, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      await UserService.deleteUser(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;  
        state.status = 'succeeded';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("Nouvel utilisateur ajouté :", action.payload); // 🔴 Ajoute ceci
        state.users.push(action.payload); // Ajoute l'utilisateur à la liste Redux
    })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(p => p.id !== action.payload);
      });
  },
});

export default userSlice.reducer;