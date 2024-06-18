import React from 'react';
import styles from './Navbar.module.css';
import { NavigateFunction, useLocation, Location, useNavigate } from 'react-router-dom';
import { IPerson } from 'types/types';

type Props = {
  user: IPerson | null;
};

export default function Navbar({ user }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const backAction = () => {
    navigate(-1);
  };

  const exitAction = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {location.pathname !== '/users' && (
        <button type="button" className={styles.back} onClick={backAction}>
          <span className={styles.btnicon}>
            <svg width="7" height="14" viewBox="0 0 7 14"  fill="#F8F8F8">
              <use href='/eye1.svg#back'/>
            </svg>
          </span>
          <span className={styles.btntext}>Назад</span>
        </button>
      )}
      <button type="button" className={styles.exit} onClick={exitAction}>
      <span className={styles.btnicon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="#F8F8F8">
              <use href='/eye1.svg#exit'/>
            </svg>
          </span>
          <span className={styles.btntext}>Выход</span>
      </button>
      {user && (
        <div className={styles.userheader}>
          <div className={styles.avatar}>
            <img src={user.avatar} alt="Аватар" />
          </div>
          <div className={styles.text}>
            <h1>{user.first_name + ' ' + user.last_name}</h1>
            <p>Партнер</p>
          </div>
        </div>
      )}
      {!user && (
        <div className={styles.textmain}>
          <div>
            <h1>Наша команда</h1>
          </div>
          <div>
            <h2>
              Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их
              плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.{' '}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
