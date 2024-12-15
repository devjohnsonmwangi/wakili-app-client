import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export interface UserDataTypes {
  user_id: number;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  role: "admin" | "user" | "lawyer" | "client" | "clerk" | "manager" | "support"; // role defaults to "client" if not provided
  profile_picture?: string;
  created_at: string; // system-generated
  updated_at: string; // system-generated
}

export const usersAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    // 1️⃣ Register a new user
    registerUser: builder.mutation<UserDataTypes, Omit<UserDataTypes, 'user_id' | 'created_at' | 'updated_at' | 'role'>>({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // 2️⃣ Get user by ID
    getUserById: builder.query<UserDataTypes, number>({
      query: (user_id) => `users/${user_id}`,
      providesTags: (_, __, id) => [{ type: "User", id }], // ✅ Replaced result, error with _ and __
    }),

    // 3️⃣ Fetch all users
    fetchUsers: builder.query<UserDataTypes[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    // 4️⃣ Fetch users by role (excluding "client" and "user")
    fetchUsersByRole: builder.query<UserDataTypes[], void>({
      query: () => "users/roles",
      providesTags: ["Users"],
    }),

    // 5️⃣ Fetch users by role and user_id
    fetchUsersByRoleAndId: builder.query<UserDataTypes[], { role: string; user_id: number }>({
      query: ({ role, user_id }) => `users/roles/${role}/${user_id}`,
      providesTags: ["Users"],
    }),

    // 6️⃣ Update a user
    updateUser: builder.mutation<UserDataTypes, Partial<Omit<UserDataTypes, 'created_at' | 'updated_at'>> & { user_id: number }>({
      query: ({ user_id, ...rest }) => ({
        url: `users/${user_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: (_, __, { user_id }) => [{ type: "User", id: user_id }], // ✅ Replaced result, error with _ and __
    }),

    // 7️⃣ Delete a user
    deleteUser: builder.mutation<{ success: boolean; user_id: number }, number>({
      query: (user_id) => ({
        url: `users/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "User", id }], // ✅ Replaced result, error with _ and __
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetUserByIdQuery,
  useFetchUsersQuery,
  useFetchUsersByRoleQuery, // <-- Export hook for fetchUsersByRole
  useFetchUsersByRoleAndIdQuery, // <-- Export hook for fetchUsersByRoleAndId
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersAPI;
