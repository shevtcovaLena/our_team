import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser } from './userSlice'


export const fetchRegUser = createAsyncThunk<Record<string, string>, IUser>('user/reg', async (inputs: IUser) => {
    try {
        const response = await axios.post(`https://reqres.in/api/register`, inputs, {withCredentials: true });
        if (response.status === 200) {
            return response.data
        }
        throw new Error('Ошибка регистрации'); 
    } catch (error) {
        console.log(error);
        return { error };
    }
})


// export const fetchLogoutUser = createAsyncThunk('user/logout', async () => {
//     try {
//         const response = await axios.get<IUser>('https://wine-server-shevtsova.amvera.io/api/user/logout', {withCredentials: true });
//         if (response.status === 200) {
//             return true
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

