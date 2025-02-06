import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  adresse: yup.string().required('L\'adresse est requise'),
  telephone: yup.string()
    .matches(/^(06|07|05)[0-9]{8}$/, 'Numéro de téléphone invalide')
    .required('Le téléphone est requis')
});

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: patient || {
      nom: '',
      prenom: '',
      email: '',
      adresse: '',
      telephone: ''
    }
  });

  useEffect(() => {
    if (patient) {
      reset(patient);
    }
  }, [patient, reset]);

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
        <label className="block text-sm font-medium text-gray-700">Prenom</label>
        <input
          {...register('prenom')}
          className={`mt-1 block w-full rounded-md border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          {...register('adresse')}
          className={`mt-1 block w-full rounded-md border ${errors.adresse ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.adresse && <p className="text-red-500 text-sm">{errors.adresse.message}</p>}
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
        <label className="block text-sm font-medium text-gray-700">Telephone</label>
        <input
          {...register('telephone')}
          className={`mt-1 block w-full rounded-md border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
        />
        {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message}</p>}
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
          {patient ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;