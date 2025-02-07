import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Define Event Types
export type EventType = "meeting" | "hearing" | "consultation" | "reminder" | "court_date";

export interface EventDataTypes {
  event_id: number;
  user_id: number;
  case_id: number;
  event_type: EventType;
  event_title: string;
  event_description?: string;
  start_time: string;
  event_date?: string;
  created_at: string;
  updated_at: string;
}

// API Slice for Events
export const eventAPI = createApi({
  reducerPath: "eventAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    fetchEvents: builder.query<EventDataTypes[], void>({
      query: () => "events",
      providesTags: ["Event"],
    }),
    getEventById: builder.query<EventDataTypes, number>({
      query: (event_id) => `events/${event_id}`,
      providesTags: ["Event"],
    }),
    createEvent: builder.mutation<EventDataTypes, Partial<EventDataTypes>>({
      query: (newEvent) => ({
        url: "events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation<EventDataTypes, Partial<EventDataTypes & { event_id: number }>>({
      query: ({ event_id, ...rest }) => ({
        url: `events/${event_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation<{ success: boolean; event_id: number }, number>({
      query: (event_id) => ({
        url: `events/${event_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useFetchEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventAPI;
