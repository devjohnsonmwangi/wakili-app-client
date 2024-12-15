// src/features/tickets/ticketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
    ticket_id: number;
    user: {
        full_name: string;
        email: string;
    };
    subject: string;
    description: string;
    status: string;
    updated_at: string;
}

interface TicketState {
    tickets: Ticket[];
    filters: {
        full_name: string;
        email: string;
        subject: string;
        status: string;
    };
    selectedTickets: Set<number>;
    toastMessage: string | null;
    toastType: 'success' | 'error' | null;
}

const initialState: TicketState = {
    tickets: [],
    filters: {
        full_name: '',
        email: '',
        subject: '',
        status: ''
    },
    selectedTickets: new Set(),
    toastMessage: null,
    toastType: null
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets(state, action: PayloadAction<Ticket[]>) {
            state.tickets = action.payload;
        },
        setFilters(state, action: PayloadAction<TicketState['filters']>) {
            state.filters = action.payload;
        },
        setSelectedTickets(state, action: PayloadAction<Set<number>>) {
            state.selectedTickets = action.payload;
        },
        showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) {
            const { message, type } = action.payload;
            state.toastMessage = message;
            state.toastType = type;
        },
        resetFilters(state) {
            state.filters = initialState.filters;
        }
    }
});

export const { setTickets, setFilters, setSelectedTickets, showToast, resetFilters } = ticketSlice.actions;
export default ticketSlice.reducer;

