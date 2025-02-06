import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients, deletePatient, setCurrentPatient, updatePatient, createPatient } from './../../features/patients/patientsSlice';
import PatientForm from './PatientForm';
import Modal from '../../components/shared/Modal';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

const PatientList = () => {
  const dispatch = useDispatch();
  const { patients, status, pagination } = useSelector(state => state.patients);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePageChange = (newPage) => {
    dispatch(fetchPatients({ page: newPage, size: pagination.size }));
  };

  const handleDelete = async () => {
    if (selectedPatient) {
      await dispatch(deletePatient(selectedPatient.id));
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Patients</h1>
        <button
          onClick={() => {
            dispatch(setCurrentPatient(null));
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Ajouter un patient
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map(patient => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.adresse}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => {
                      dispatch(setCurrentPatient(patient));
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowDeleteDialog(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={pagination.page === 0}
          onClick={() => handlePageChange(pagination.page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {pagination.page + 1} sur {pagination.totalPages}</span>
        <button
          disabled={pagination.page >= pagination.totalPages - 1}
          onClick={() => handlePageChange(pagination.page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Suivant
        </button>
      </div>

      {/* Modals */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <PatientForm
          patient={selectedPatient}
          onSubmit={(data) => {
            if (selectedPatient) {
              dispatch(updatePatient({ id: selectedPatient.id, patientData: data }));
            } else {
              dispatch(createPatient(data));
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      </Modal>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce patient ?"
      />
    </div>
  );
};

export default PatientList;