// import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Person from '../Person/Person';
import styles from './List.module.css';
import { PersonsType } from 'types/types';

type ListPropsType = {
  users: PersonsType;  
};

export default function List({ users }: ListPropsType): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className={styles.container}>
      {users?.map((user) => (
        <Person
          key={user.id}
          user={user}
          onClick={() => handleNavigate(user.id)}
        />
      ))}
    </div>
  );
}
