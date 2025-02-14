import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSalles } from './../features/salle/salleSlice';
import SalleList from './../components/salle/SalleList';

const SallePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalles({ page: 0, size: 10 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <SalleList />
    </div>
  );
};

export default SallePage;
