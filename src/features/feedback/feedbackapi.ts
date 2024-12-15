import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Define Feedback Data Types
export interface FeedbackDataTypes {
  feedback_id: number; // Unique identifier for the feedback
  case_id: number; // Associated case ID
  user_id: number; // ID of the user providing the feedback
  rating: number; // Rating out of 5
  comments?: string; // Optional comments provided by the user
 
}

// API Slice for Feedback
export const feedbackAPI = createApi({
  reducerPath: "feedbackAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    // Fetch all feedback entries
    fetchFeedbacks: builder.query<FeedbackDataTypes[], void>({
      query: () => "feedbacks",
      providesTags: ["Feedback"],
    }),
    // Fetch feedback by ID
    getFeedbackById: builder.query<FeedbackDataTypes, number>({
      query: (feedback_id) => `feedbacks/${feedback_id}`,
      providesTags: ["Feedback"],
    }),
    // Create new feedback
    createFeedback: builder.mutation<FeedbackDataTypes, Partial<FeedbackDataTypes>>({
      query: (newFeedback) => ({
        url: "feedbacks",
        method: "POST",
        body: newFeedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    // Update existing feedback
    updateFeedback: builder.mutation<FeedbackDataTypes, Partial<FeedbackDataTypes & { feedback_id: number }>>({
      query: ({ feedback_id, ...rest }) => ({
        url: `feedbacks/${feedback_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Feedback"],
    }),
    // Delete feedback entry
    deleteFeedback: builder.mutation<{ success: boolean; feedback_id: number }, number>({
      query: (feedback_id) => ({
        url: `feedbacks/${feedback_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useFetchFeedbacksQuery,
  useGetFeedbackByIdQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackAPI;
