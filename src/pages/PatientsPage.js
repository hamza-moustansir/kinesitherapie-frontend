import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPatients } from './../features/patients/patientsSlice';
import PatientList from './../components/patients/PatientList';

const PatientsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatients({ page: 0, size: 10 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <PatientList />
    </div>
  );
};

export default PatientsPage;