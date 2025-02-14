import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Définition du schéma de validation avec les bons champs
const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  location: yup.string().required("L'emplacement est requis"),
  status: yup.string().oneOf(["AVAILABLE", "IN_USE", "MAINTENANCE", "OCCUPIED"], "Statut invalide").required('Le statut est requis'),
  nombreLits: yup.number().typeError('Le nombre de lits doit être un nombre').required('Le nombre de lits est requis').min(1, 'Le nombre de lits doit être positif'),
});

const SalleForm = ({ salle, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: salle || {
      nom: '',
      location: '',
      status: '',
      nombreLits: '',
    },
  });
  useEffect(() => {
    console.log("Salles mises à jour après création :", salle);
  }, [salle]);
  

  return (
    <form
  onSubmit={handleSubmit((data) => {
    const formattedData = {
      id: data.id,
      name: data.nom,  // 🔥 L'API attend "name"
      location: data.location,
      status: data.status,
      nombreLits: parseInt(data.nombreLits, 10) // 🔥 L'API attend "nombreLits"
    };
    onSubmit(formattedData);
  })}
>


      {/* Champ Nom */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          {...register('nom')}
          className={`mt-1 block w-full rounded-md border ${errors.nom ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
      </div>

      {/* Champ Emplacement */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Emplacement</label>
        <input
          {...register('location')}
          className={`mt-1 block w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      {/* Champ Statut */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          {...register('status')}
          className={`mt-1 block w-full rounded-md border ${errors.status ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        >
          <option value="">Sélectionner le statut</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="IN_USE">En cours d'utilisation</option>
          <option value="MAINTENANCE">En maintenance</option>
          <option value="OCCUPIED">Occupée</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      {/* Champ Nombre de lits */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre de lits</label>
        <input
          {...register('nombreLits')}
          type="number"
          className={`mt-1 block w-full rounded-md border ${errors.nombreLits ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.nombreLits && <p className="text-red-500 text-sm">{errors.nombreLits.message}</p>}
      </div>

      {/* Boutons d'action */}
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
          {salle ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default SalleForm;
