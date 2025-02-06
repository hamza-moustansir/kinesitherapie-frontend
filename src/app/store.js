import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patientReducer from '../features/patients/patientsSlice'; 

export default configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer 
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false 
    })
});