import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OneUserPage.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { IPerson } from 'types/types';

export function OneUserPage(): JSX.Element {
  const { id } = useParams();

  const [user, setUser] = useState<IPerson | null>(null);

  useEffect(() => {
    axios
      .get<IPerson>(`https://reqres.in/api/users/${id}`)
      .then((response) => setUser(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar user={user as IPerson} />
      {user ? (
        <div className={styles.container}>
          <div className={styles.textcontainer}>
            <p>
              Eiusmod nostrud eu velit dolor ea commodo velit. Sit Lorem reprehenderit exercitation
              in labore irure sint cillum. Ullamco et eu do ullamco consectetur sint sint voluptate
              laborum. Duis non aliqua nulla esse sunt.
              <br />
              <br />
              Anim dolor consequat occaecat tempor non cillum aute ipsum consequat minim pariatur
              ullamco laborum. Occaecat culpa incididunt sunt qui commodo cupidatat et non. Dolor
              magna ipsum ex cillum dolor commodo labore velit exercitation ullamco magna.
              <br />
              <br />
              Et ex mollit aliquip aliqua aliquip non non laborum. Sint incididunt ipsum culpa nisi
              esse aliquip ut irure. Nulla ea consequat ipsum est ipsum ex mollit.
            </p>
          </div>
          <div className={styles.contacts}>
            <p>
              <svg width="22" height="22" viewBox="0 0 22 22" stroke="#512689">
                <use href="/eye1.svg#phone" />
              </svg>{' '}
              +7(954)333-44-55
            </p>
            <p>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="#512689">
                <use href="/eye1.svg#email" />
              </svg>{' '}
              +7(954)333-44-55
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
