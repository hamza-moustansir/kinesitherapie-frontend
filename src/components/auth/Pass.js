import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Assurez-vous que ce chemin est correct

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      await api.post('/forgot-password/request-code', { email });
      setMessage('✅ Un code de vérification a été envoyé à votre email.');
      setTimeout(() => navigate('/'), 2000); // Rediriger vers la page d'accueil après 2 secondes
    } catch (err) {
      setMessage('❌ Échec de l’envoi du code. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-8">
          Mot de Passe Oublié
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleRequestCode}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && (
              <p className={`text-center text-sm ${message.includes('❌') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700"
            >
              Demander un code de vérification
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
