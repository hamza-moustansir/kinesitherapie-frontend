import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
          Création de compte
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-gray-600">
            Déjà inscrit ?{' '}
            <a 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;