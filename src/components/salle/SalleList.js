import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalles, createSalle, setCurrentSalle, deleteSalle, updateSalle } from '../../features/salle/salleSlice';
import SalleForm from './SalleForm';
import Modal from '../../components/shared/Modal';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

const SalleList = () => {
  const dispatch = useDispatch();
  const { salles = [], status, error, pagination = { page: 0, size: 10, totalPages: 1 } } = useSelector((state) => state.salles || {});

  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSalle, setSelectedSalle] = useState(null);

  const handlePageChange = (newPage) => {
    dispatch(fetchSalles({ page: newPage, size: pagination.size }));
  };

  useEffect(() => {
    dispatch(fetchSalles({ page: pagination.page, size: pagination.size }));
  }, [dispatch, pagination.page]);
  
  useEffect(() => {
    console.log("Salles mises à jour :", salles); // 🔍 Vérifie si Redux met bien à jour la liste
  }, [salles]);
  

  const handleDelete = async () => {
    if (selectedSalle) {
      await dispatch(deleteSalle(selectedSalle.id));
      dispatch(fetchSalles({ page: pagination.page, size: pagination.size })); // 🔄 Refresh après suppression
      setShowDeleteDialog(false);
      setSelectedSalle(null); // ✅ Réinitialisation
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Salles</h1>
        <button
          onClick={() => {
            setSelectedSalle(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Ajouter une salle
        </button>
      </div>

      {status === 'loading' && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emplacement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de lits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {salles.map((salle) => (
    <tr key={salle.id}>
      <td className="px-6 py-4 whitespace-nowrap">{salle.nom}</td> {/* Correction de name -> nom */}
      <td className="px-6 py-4 whitespace-nowrap">{salle.location}</td>
      <td className="px-6 py-4 whitespace-nowrap">{salle.status}</td>
      <td className="px-6 py-4 whitespace-nowrap">{salle.nombreLits}</td> {/* Correction de queue -> nombreLits */}
      <td className="px-6 py-4 whitespace-nowrap space-x-2">
        <button
          onClick={() => {
            setSelectedSalle(salle);
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

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <SalleForm
          salle={selectedSalle}
          onSubmit={(data) => {
            dispatch(createSalle(data)).then(() => {
              dispatch(fetchSalles()); // 🔄 Recharge les salles pour éviter des erreurs d'affichage
            });
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
        message="Êtes-vous sûr de vouloir supprimer cette salle ?"
      />
    </div>
  );
};

export default SalleList;
