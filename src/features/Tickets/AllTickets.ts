import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from './../../utils/APIDomain';

export interface UserTicketData {
    tickets: TypeTickets[]; // Array of tickets
}

export interface TypeTickets {
    ticket_id: number;
    user_id: number;
    subject: string;
    description: string;
    status: string;
    updated_at: string;
    created_at: string;
    user: {
        full_name: string;
        email: string;
        phone_number: string;
    };
}

export const TicketAPI = createApi({
    reducerPath: 'TicketAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: APIDomain,
  
    }),
    refetchOnReconnect: true,
    tagTypes: ['ticket'],
    endpoints: (builder) => ({
        getTickets: builder.query<TypeTickets[], void>({
            query: () => '/ticket',
            providesTags: ['ticket'],
        }),
        createTicket: builder.mutation<TypeTickets, Partial<TypeTickets>>({
            query: (newTicket) => ({
                url: 'ticket',
                method: 'POST',
                body: newTicket,
            }),
            invalidatesTags: ['ticket'],
        }),
        updateTicket: builder.mutation({
            query: ({ ticket_id, ...rest }) => ({
                url: `ticket/${ticket_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['ticket'],
        }),
        deleteTicket: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `ticket/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ticket'],
        }),
        getTicketById: builder.query<TypeTickets, number>({
            query: (id) => `ticket/${id}`,
            providesTags: ['ticket'],
        }),
        getUserTickets: builder.query<TypeTickets[], number>({
            query: (id) => `/ticket/user/${id}`,
            providesTags: ['ticket'],
        }),
    }),
});
