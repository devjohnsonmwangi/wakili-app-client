import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Define Branch Location Types
export interface BranchLocationDataTypes {
  branch_id: number; // Unique identifier for the branch
  name: string; // Name of the branch
  address: string; // Address of the branch
  contact_phone: string; // Contact phone number

}

// API Slice for Branch Locations
export const locationBranchAPI = createApi({
  reducerPath: "locationBranchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["BranchLocation"],
  endpoints: (builder) => ({
    // Fetch all branch locations
    fetchBranchLocations: builder.query<BranchLocationDataTypes[], void>({
      query: () => "branchLocations",
      providesTags: ["BranchLocation"],
    }),
    // Fetch branch location by ID
    getBranchLocationById: builder.query<BranchLocationDataTypes, number>({
      query: (branch_id) => `branchLocations/${branch_id}`,
      providesTags: ["BranchLocation"],
    }),
    // Create a new branch location
    createBranchLocation: builder.mutation<BranchLocationDataTypes, Partial<BranchLocationDataTypes>>({
      query: (newBranch) => ({
        url: "branchLocations",
        method: "POST",
        body: newBranch,
      }),
      invalidatesTags: ["BranchLocation"],
    }),
    // Update an existing branch location
    updateBranchLocation: builder.mutation<BranchLocationDataTypes, Partial<BranchLocationDataTypes & { branch_id: number }>>({
      query: ({ branch_id, ...rest }) => ({
        url: `branchLocations/${branch_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["BranchLocation"],
    }),
    // Delete a branch location
    deleteBranchLocation: builder.mutation<{ success: boolean; branch_id: number }, number>({
      query: (branch_id) => ({
        url: `branchLocations/${branch_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BranchLocation"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useFetchBranchLocationsQuery,
  useGetBranchLocationByIdQuery,
  useCreateBranchLocationMutation,
  useUpdateBranchLocationMutation,
  useDeleteBranchLocationMutation,
} = locationBranchAPI;
