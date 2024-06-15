import React from 'react';
import styles from './Navbar.module.css';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate: NavigateFunction = useNavigate();

  const backAction = () => {
    navigate(-1);
  };

  const forwardAction = () => {
    navigate(+1);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={backAction}>
        {'<'}
      </button>
      <button type="button" onClick={forwardAction}>
        {'>'}
      </button>

      <Link to="/">| Main |</Link>
      <Link to="/counter">| Counter |</Link>
      <Link to="/dogs">| Dogs |</Link>
      <Link to="/users">| Person |</Link>
    </div>
  );
}
