import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './../features/user/userSlice';
import UserList from './../components/user/UserList';

const UserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, size: 10 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <UserList />
    </div>
  );
};

export default UserPage;