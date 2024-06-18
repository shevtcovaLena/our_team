import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import List from '../../components/List/List';
import Navbar from '../../components/Navbar/Navbar';
import { fetchLikes, fetchUsers } from '../../redux/thunkActions';
// import { setlikes } from '../../redux/personsSlice';

export function UsersPage(): JSX.Element {
  const users = useAppSelector((state) => state.personsSlice.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUsers());
    void dispatch(fetchLikes());
  // },[]);

  // useEffect(() => {
  //   let likes:string;
  //   (function () {
  //     likes = localStorage.getItem('likes');
  //     if (likes) {
  //       JSON.parse(likes).forEach((el) => {
  //         // if (el.like) {
  //           const likedUser = users.find((user) => user.id === el.id);
  //           if (likedUser) {
  //             dispatch(setlikes({id: el.id, like: el.like}));
  //           }
  //         // }
  //       });
  //     }
  //   })();
    return () => {
      // (function () {
        console.log('размонтируем');
        localStorage.setItem(
          'likes',
          JSON.stringify(users.map((el) => ({ id: el.id, like: el.like }))),
        );
      // })();
    };
  }, []);

  return (
    <>
      <Navbar user={null} />
      <List users={users} />
    </>
  );
}
