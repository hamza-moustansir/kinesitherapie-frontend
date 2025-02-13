import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patientReducer from '../features/patients/patientsSlice'; 
import userReducer from '../features/user/userSlice'; 
import salleReducer from '../features/salle/salleSlice'; 


export default configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    users: userReducer,
    salles: salleReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false 
    })
});