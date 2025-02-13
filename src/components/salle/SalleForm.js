import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  location: yup.string().required('L\'emplacement est requis'),
  status: yup.string().required('Le statut est requis'),
  capacity: yup.number().required('La capacité est requise').min(1, 'La capacité doit être positive'),
  queue: yup.number().required('Le nombre de lits est requis').min(1, 'Le nombre de lits doit être positif'),
});

const SalleForm = ({ salle, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: salle || {
      name: '',
      location: '',
      status: '',
      capacity: '',
      queue: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          {...register('name')}
          className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Emplacement</label>
        <input
          {...register('location')}
          className={`mt-1 block w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          {...register('status')}
          className={`mt-1 block w-full rounded-md border ${errors.status ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        >
          <option value="">Sélectionner le statut</option>
          <option value="OCCUPE">Occupée</option>
          <option value="LIBRE">Libre</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Capacité</label>
        <input
          {...register('capacity')}
          type="number"
          className={`mt-1 block w-full rounded-md border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre de lits</label>
        <input
          {...register('queue')}
          type="number"
          className={`mt-1 block w-full rounded-md border ${errors.queue ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.queue && <p className="text-red-500 text-sm">{errors.queue.message}</p>}
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
          {salle ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default SalleForm;
