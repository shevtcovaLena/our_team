import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { IInputs, IUser, UsersType } from '../types/types';

export const fetchUsers = createAsyncThunk('posts/all', async () => { // 'posts/all' = это не URL
  try {
    const response = await axios.get<UsersType>(`http://localhost:3002/posts/`); // URL ТУТ
    return response.data; //* это payload
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddUser = createAsyncThunk('posts/add', async (inputs: IInputs) => {
  try {
    const response = await axios.post<IInputs, AxiosResponse<UsersType>>(
      `http://localhost:3002/posts/`,
      inputs,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchDeleteUser = createAsyncThunk('posts/del', async (id: number) => {
  const response = await axios.delete(`http://localhost:3002/posts/${id}`);
  if (response.status === 200) {
    return id;
  }
});
