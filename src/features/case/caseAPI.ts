import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Enums for Case Table
export type CaseType =
  | "criminal"
  | "civil"
  | "family"
  | "corporate"
  | "property"
  | "employment"
  | "intellectual_property"
  | "immigration"
    "ELC"
    "childrenCase"
    "conveyances"
    "Tribunal";

   

export type CaseStatus = "open" | "in_progress" | "closed" | "on_hold" | "resolved";

// Enums for Payment Table
export type PaymentStatus = "pending" | "paid" | "failed";

// Case Data Types
export interface CaseDataTypes {
  case_id: number;
  user_id: number;
  case_type: CaseType;
  case_status: CaseStatus;
  case_description: string | null;
  case_number: string;
  case_track_number: string;
  court:string;
  station:string;
  parties:string;
  fee: number;
  payment_status: string;
  created_at: string;
}

// Payment Data Types
export interface PaymentDataTypes {
  payment_id: number;
  case_id: number;
  user_id: number;
  payment_amount: string | null;
  payment_status: PaymentStatus;
  payment_mode: string | null;
  session_id: string | null;
  transaction_id: string | null;
  payment_date: string;
  updated_at: string;
}

// Combined API Slice
export const caseAndPaymentAPI = createApi({
  reducerPath: "caseAndPaymentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Cases", "Payments"],
  endpoints: (builder) => ({
    // ** Case Endpoints **
    fetchCases: builder.query<CaseDataTypes[], void>({
      query: () => "cases",
      providesTags: ["Cases"],
    }),
    getCaseById: builder.query<CaseDataTypes, number>({
      query: (case_id) => `cases/${case_id}`,
      providesTags: ["Cases"],
    }),
    getUserCasesByUserId: builder.query<CaseDataTypes[], number>({
      query: (id) => `/cases/user/${id}`,
      providesTags: ['Cases'],
  }),
    createCase: builder.mutation<CaseDataTypes, Partial<CaseDataTypes>>({
      query: (newCase) => ({
        url: "cases",
        method: "POST",
        body: newCase,
      }),
      invalidatesTags: ["Cases"],
    }),
    updateCase: builder.mutation<CaseDataTypes, Partial<CaseDataTypes & { case_id: number }>>({
      query: ({ case_id, ...rest }) => ({
        url: `cases/${case_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Cases"],
    }),
    deleteCase: builder.mutation<{ success: boolean; case_id: number }, number>({
      query: (case_id) => ({
        url: `cases/${case_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cases"],
    }),


    // ** Payment Endpoints **
    fetchPayments: builder.query<PaymentDataTypes[], void>({
      query: () => "payments",
      providesTags: ["Payments"],
    }),
    getPaymentById: builder.query<PaymentDataTypes, number>({
      query: (payment_id) => `payments/${payment_id}`,
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation<PaymentDataTypes, Partial<PaymentDataTypes>>({
      query: (newPayment) => ({
        url: "payments",
        method: "POST",
        body: newPayment,
      }),
      invalidatesTags: ["Payments"],
    }),
    updatePayment: builder.mutation<PaymentDataTypes, Partial<PaymentDataTypes & { payment_id: number }>>({
      query: ({ payment_id, ...rest }) => ({
        url: `payments/${payment_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayment: builder.mutation<{ success: boolean; payment_id: number }, number>({
      query: (payment_id) => ({
        url: `payments/${payment_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Case Hooks
  useGetUserCasesByUserIdQuery,
  useFetchCasesQuery,
  useGetCaseByIdQuery,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  
  // Payment Hooks
  useFetchPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = caseAndPaymentAPI;
