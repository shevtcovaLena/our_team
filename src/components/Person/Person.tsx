import React, { Dispatch, SetStateAction } from 'react';
import { UserType } from '../../App';
import axios from 'axios';

type UserPropsType = {
  users: UserType;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
  onClick: () => void;
};

export default function Person({ users, setUsers, onClick }: UserPropsType): JSX.Element {
  const deleteHandler = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}${users.id}`);
    setUsers((prev) => prev.filter((el) => el.id !== users.id));
  };
  return (
    <div
      onClick={onClick}
      style={{ padding: '20px', border: '1px solid white', margin: '10px', cursor: 'pointer' }}
    >
      <h1>{users.title}</h1>
      <p>{users.body}</p>
      <button type="button" onClick={deleteHandler}>
        Удалить
      </button>
    </div>
  );
}
