import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../users/userSlice";
import { APIDomain } from "../../utils/APIDomain";


export interface TLoginResponse {
    token: string;
    user: User;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    tagTypes: ['Login'], 
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLoginResponse, LoginFormData>({
            query: (user) => ({
                url: 'auth/login',
                method: 'POST',
                body: user,
            }),
        }),
        // logout
        
    }),
});