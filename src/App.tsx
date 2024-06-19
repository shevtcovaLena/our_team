import React from 'react';
import './App.css';
import { LogIn, OneUserPage, UsersPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import { useAppSelector } from './redux/hooks';

export type UserType = {
  id: number;
  title: string;
  body: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function App(): JSX.Element {
  const isAuth = useAppSelector((state) => state.personsSlice.isAuth);

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route element={<ProtectedRoute isAuth={isAuth} redirectTo="/" />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<OneUserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
