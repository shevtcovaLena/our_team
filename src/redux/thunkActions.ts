import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PersonsType } from '../types/types';

export const fetchUsers = createAsyncThunk('persons/all', async () => {
  try {
    const response = await axios.get<{ data: PersonsType }>(
      `https://reqres.in/api/users?page=1&per_page=100`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});