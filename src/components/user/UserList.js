import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, setCurrentUser, deleteUser, updateUser  } from '../../features/user/userSlice';
import UserForm from './UserForm';
import Modal from '../../components/shared/Modal';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

const UserList = () => {
  const dispatch = useDispatch();
  const { users = [], status, error, pagination = { page: 0, size: 10, totalPages: 1 } } = useSelector((state) => state.users || {});



  const [showForm, setShowForm] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handlePageChange = (newPage) => {
    dispatch(fetchUsers({ page: newPage, size: pagination.size }));
  };
  

  useEffect(() => {
    dispatch(fetchUsers({ page: pagination.page, size: pagination.size }));
  }, [dispatch]);
  
    

  const handleDelete = async () => {
    if (selectedUser) {
      await dispatch(deleteUser(selectedUser.id));
      dispatch(fetchUsers({ page: pagination.page, size: pagination.size })); // 🔄 Refresh après suppression
      setShowDeleteDialog(false);
      setSelectedUser(null); // ✅ Réinitialisation
    }
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Ajouter un utilisateur
        </button>
      </div>

      {status === 'loading' && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
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
        <UserForm
          user={selectedUser}
          onSubmit={(data) => {
            if (selectedUser) {
              dispatch(updateUser({ id: selectedUser.id, userData: data }));
            } else {
              dispatch(createUser(data));
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
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
    </div>
  );
};

export default UserList;