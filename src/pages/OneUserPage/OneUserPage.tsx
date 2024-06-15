import type { UserType } from 'App';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OneUserPage.module.css';

export function OneUserPage(): JSX.Element {
  const { id } = useParams();

  const [users, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    axios
      .get<UserType>(`http://localhost:3333/api/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {users ? (
        <div className={styles.container}>
          <h1>{users.title}</h1>
          <p>{users.body}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
