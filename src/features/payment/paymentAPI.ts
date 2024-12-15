import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Enums for Payment Table
export type PaymentStatus = "pending" | "paid" | "failed";

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

// Payment API Slice
export const paymentAPI = createApi({
  reducerPath: "paymentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    // Fetch all payments
    fetchPayments: builder.query<PaymentDataTypes[], void>({
      query: () => "payments",
      providesTags: ["Payments"],
    }),
    // Get a payment by ID
    getPaymentById: builder.query<PaymentDataTypes, number>({
      query: (payment_id) => `payments/${payment_id}`,
      providesTags: ["Payments"],
    }),
    // Create a new payment
    createPayment: builder.mutation<PaymentDataTypes, Partial<PaymentDataTypes>>({
      query: (newPayment) => ({
        url: "payments",
        method: "POST",
        body: newPayment,
      }),
      invalidatesTags: ["Payments"],
    }),
    // Update an existing payment
    updatePayment: builder.mutation<PaymentDataTypes, Partial<PaymentDataTypes & { payment_id: number }>>({
      query: ({ payment_id, ...rest }) => ({
        url: `payments/${payment_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Payments"],
    }),
    // Delete a payment by ID
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
  useFetchPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentAPI;
