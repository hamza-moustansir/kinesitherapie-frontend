import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
          Centre de Kinésithérapie
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <LoginForm />
          <p className="mt-4 text-center text-sm text-gray-600">
            Pas de compte ?{' '}
            <a 
              href="/register" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;