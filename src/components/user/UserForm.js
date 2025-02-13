import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  motDePasse: yup.string().required('Le mot de passe est requis'), // 🔥 Correction ici
  role: yup.string().required('Le rôle est requis'),
});

const UserForm = ({ user, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user || {
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '', // 🔥 Correction ici
      role: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          {...register('nom')}
          className={`mt-1 block w-full rounded-md border ${errors.nom ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          {...register('prenom')}
          className={`mt-1 block w-full rounded-md border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          {...register('motDePasse')} // 🔥 Correction ici
          className={`mt-1 block w-full rounded-md border ${errors.motDePasse ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.motDePasse && <p className="text-red-500 text-sm">{errors.motDePasse.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          {...register('role')}
          className={`mt-1 block w-full rounded-md border ${errors.role ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        >
          <option value="">Sélectionnez un rôle</option>
          <option value="ADMIN">Admin</option>
          <option value="SECRETAIRE">Secrétaire</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {user ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
