import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../../App';
import Person from '../Person/Person';

type ListPropsType = {
  todos: UserType[];
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

export default function List({ todos, setUsers }: ListPropsType): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      {todos?.map((users) => (
        <Person
          key={users.id}
          users={users}
          setUsers={setUsers}
          onClick={() => handleNavigate(users.id)}
        />
      ))}
    </div>
  );
}
