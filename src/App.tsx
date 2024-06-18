import React from 'react';
import './App.css';
import { LogIn, OneUserPage, UsersPage } from './pages';
// import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import { getCookie } from './helpers/getcockie';

export type UserType = {
  id: number;
  title: string;
  body: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function App(): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LogIn />} />
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/counter" element={<CounterPage />} /> */}
        <Route element={<ProtectedRoute isAuth={Boolean(getCookie('token'))} redirectTo="/" />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<OneUserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
