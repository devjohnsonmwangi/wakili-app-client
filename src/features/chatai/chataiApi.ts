import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/APIDomain';

interface ChatRequest {
  prompt: string;
}

interface ChatResponse {
  response: string;
}

export const chatAiApi = createApi({
  reducerPath: 'chatAiApi',
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (message) => ({
        url: '/api/ai-chat',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatAiApi;
