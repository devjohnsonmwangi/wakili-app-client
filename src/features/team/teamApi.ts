// 📁 services/teamApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/APIDomain'; // Import the base API domain

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }), // Use the URL from utils
  endpoints: (builder) => ({
    getTeamByRoles: builder.query({
      query: () => 'users/roles', // Updated endpoint to match your backend router logic
    }),
  }),
});

export const { useGetTeamByRolesQuery } = teamApi;
