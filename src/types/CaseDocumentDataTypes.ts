export interface CaseDocumentDataTypes {
    document_id: number;
    case_id: number;
    document_name: string; // Name of the file
    document_url: string; // URL or path to the file
    mime_type: string; // MIME type of the file (e.g., "application/pdf", "text/plain")
    file_size: number; // Size of the file in bytes
  
  }