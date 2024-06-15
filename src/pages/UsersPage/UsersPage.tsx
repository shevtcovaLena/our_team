import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import List from '../../components/List/List';

export type UserType = {
  id: number;
  title: string;
  body: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function UsersPage(): JSX.Element {
  const [todos, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    axios
      .get<UserType[]>('https://reqres.in/api/users?page=1')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Person-List</h1>
      <Form setUsers={setUsers} />
      <List todos={todos} setUsers={setUsers} />
    </>
  );
}
