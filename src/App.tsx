import React from 'react';
import './App.css';
import { LogIn, MainPage, OneUserPage, UsersPage } from './pages';
// import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';

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
        {/* <Route element={<ProtectedRoute isAuth={false} redirectTo="/" />}>
          <Route path="/users/:page" element={<UsersPage />} />
          <Route path="/users/:id" element={<OneUserPage />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
