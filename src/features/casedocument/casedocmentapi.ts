import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

// Define Case Document Types
export interface CaseDocumentDataTypes {
  document_id: number;
  case_id: number;
  document_name: string; // Name of the file
  document_url: string; // URL or path to the file
  mime_type: string; // MIME type of the file (e.g., "application/pdf", "text/plain")
  file_size: number; // Size of the file in bytes

}

// API Slice for Case Documents
export const caseDocumentAPI = createApi({
  reducerPath: "caseDocumentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  refetchOnReconnect: true,
  tagTypes: ["CaseDocument"],
  endpoints: (builder) => ({
    // Fetch all case documents
    fetchCaseDocuments: builder.query<CaseDocumentDataTypes[], void>({
      query: () => "caseDocuments",
      providesTags: ["CaseDocument"],
    }),
    // Fetch case document by ID
    getCaseDocumentById: builder.query<CaseDocumentDataTypes, number>({
      query: (document_id) => `caseDocuments/${document_id}`,
      providesTags: ["CaseDocument"],
    }),
    // Create a new case document
    createCaseDocument: builder.mutation<CaseDocumentDataTypes, Partial<CaseDocumentDataTypes>>({
      query: (newDocument) => ({
        url: "caseDocuments",
        method: "POST",
        body: newDocument,
      }),
      invalidatesTags: ["CaseDocument"],
    }),
    // Update an existing case document
    updateCaseDocument: builder.mutation<CaseDocumentDataTypes, Partial<CaseDocumentDataTypes & { document_id: number }>>({
      query: ({ document_id, ...rest }) => ({
        url: `caseDocuments/${document_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["CaseDocument"],
    }),
    // Delete a case document
    deleteCaseDocument: builder.mutation<{ success: boolean; document_id: number }, number>({
      query: (document_id) => ({
        url: `caseDocuments/${document_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CaseDocument"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useFetchCaseDocumentsQuery,
  useGetCaseDocumentByIdQuery,
  useCreateCaseDocumentMutation,
  useUpdateCaseDocumentMutation,
  useDeleteCaseDocumentMutation,
} = caseDocumentAPI;
