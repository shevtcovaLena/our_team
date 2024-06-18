import React, { Dispatch, SetStateAction } from 'react';
import { UserType } from '../../App';
import axios from 'axios';
import styles from './Person.module.css'
import { IPerson } from 'types/types';
import { useAppDispatch } from '../../redux/hooks';
import { likeaction } from '../../redux/personsSlice';

type UserPropsType = {
  user: IPerson;
  onClick: () => void;
};

export default function Person({ user, onClick }: UserPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  
  const likeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(likeaction(user.id));
  };
    
  return (
    <div
      onClick={onClick}
      className={styles.container}     
    >
      <div className={styles.avatar}><img src={user.avatar} alt="Аватар" /></div>
      <h2>{user.first_name + ' ' + user.last_name}</h2>
      <div role='button' className={styles.like} onClick={(e) => likeHandler(e)}>
      <svg width="16" height="14" viewBox="0 0 16 14" fill={user.like ?"#512689":"none"} stroke={user.like ?"none":"#151317"}>
        <use href='/eye1.svg#like'/>
      </svg>
      </div>
    </div>
  );
}
