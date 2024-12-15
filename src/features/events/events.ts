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

export interface EventReminderDataTypes {
  reminder_id: number;
  event_id: number;
  reminder_time: string;
  reminder_message?: string;
  created_at: string;
  updated_at: string;
}

// Combined API Slice for Events and Event Reminders
export const eventAndReminderAPI = createApi({
  reducerPath: "eventAndReminderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["Event", "EventReminder"],
  endpoints: (builder) => ({
    // Event Endpoints
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

    // Event Reminder Endpoints
    fetchReminders: builder.query<EventReminderDataTypes[], void>({
      query: () => "eventReminders",
      providesTags: ["EventReminder"],
    }),
    getReminderById: builder.query<EventReminderDataTypes, number>({
      query: (reminder_id) => `eventReminders/${reminder_id}`,
      providesTags: ["EventReminder"],
    }),
    createReminder: builder.mutation<EventReminderDataTypes, Partial<EventReminderDataTypes>>({
      query: (newReminder) => ({
        url: "eventReminders",
        method: "POST",
        body: newReminder,
      }),
      invalidatesTags: ["EventReminder"],
    }),
    updateReminder: builder.mutation<EventReminderDataTypes, Partial<EventReminderDataTypes & { reminder_id: number }>>({
      query: ({ reminder_id, ...rest }) => ({
        url: `eventReminders/${reminder_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["EventReminder"],
    }),
    deleteReminder: builder.mutation<{ success: boolean; reminder_id: number }, number>({
      query: (reminder_id) => ({
        url: `eventReminders/${reminder_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventReminder"],
    }),
  }),
});

export const {
  // Event Hooks
  useFetchEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  // Event Reminder Hooks
  useFetchRemindersQuery,
  useGetReminderByIdQuery,
  useCreateReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
} = eventAndReminderAPI;
