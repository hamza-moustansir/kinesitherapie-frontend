import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PatientService from './patientsService';

const initialState = {
  patients: [],
  currentPatient: null,
  status: 'idle',
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  }
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async ({ page, size }, thunkAPI) => {
    try {
      return await PatientService.getAllPatients(page, size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/create',
  async (patientData, thunkAPI) => {
    try {
      const response = await PatientService.createPatient(patientData);
      console.log('Réponse dans le slice:', response); // Log de la réponse
      return response;
    } catch (error) {
      console.error('Erreur dans le slice:', error); // Log de l'erreur
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async ({ id, patientData }, thunkAPI) => {
    try {
      console.log('ID envoyé pour mise à jour:', id);
      console.log('Données envoyées:', patientData);
      return await PatientService.updatePatient(id, patientData);
    } catch (error) {
      console.error('Erreur updatePatient:', error.response);
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur inconnue');
    }
  }
);


export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (id, thunkAPI) => {
    try {
      await PatientService.deletePatient(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages
        };
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.unshift(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        console.log('Données renvoyées après update:', action.payload);
        console.log('ID mis à jour:', action.payload.id);
        
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        } else {
          console.warn("Aucun patient trouvé avec cet ID !");
        }
      })         
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(p => p.id !== action.payload);
      });
  }
});

export const { setCurrentPatient } = patientSlice.actions;
export default patientSlice.reducer;