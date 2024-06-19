import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import List from '../../components/List/List';
import Navbar from '../../components/Navbar/Navbar';
import { fetchUsers } from '../../redux/thunkActions';

export function UsersPage(): JSX.Element {
  const users = useAppSelector((state) => state.personsSlice.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUsers());
  }, []);
 
  return (
    <>
      <Navbar user={null} />
      <List users={users} />
    </>
  );
}
