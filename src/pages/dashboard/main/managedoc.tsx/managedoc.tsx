import { useEffect, useState } from 'react';
import { caseDocumentAPI, CaseDocumentDataTypes } from '../../../../features/casedocument/casedocmentapi';
import { AiOutlineDownload } from 'react-icons/ai';
import { BiFile } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes('image')) return <BiFile className="text-blue-500 text-2xl" />;
  if (mimeType.includes('pdf')) return <BiFile className="text-red-500 text-2xl" />;
  return <BiFile className="text-gray-500 text-2xl" />;
};

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const DocumentReport = () => {
  const { data: documentsData = [], isLoading: documentsLoading } = caseDocumentAPI.useFetchCaseDocumentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [filteredDocuments, setFilteredDocuments] = useState<CaseDocumentDataTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateDocumentId, setUpdateDocumentId] = useState<number | null>(null);

  useEffect(() => {
    if (!documentsLoading && documentsData.length > 0) {
      setFilteredDocuments(documentsData);
    }
  }, [documentsLoading, documentsData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = documentsData.filter((doc) =>
      doc.document_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !documentName) return alert('Please provide both a file and document name.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_name', documentName);

    if (isUpdating && updateDocumentId) {
      // Update document logic
      caseDocumentAPI.useUpdateDocumentMutation({ documentId: updateDocumentId, formData })
        .then(() => {
          alert('Document updated successfully.');
          setIsUpdating(false);
          setFile(null);
          setDocumentName('');
        })
        .catch(() => alert('Failed to update document.'));
    } else {
      // Upload document logic
      caseDocumentAPI.useCreateCaseDocumentMutation(formData)
        .then(() => {
          alert('Document uploaded successfully.');
          setFile(null);
          setDocumentName('');
        })
        .catch(() => alert('Failed to upload document.'));
    }
  };

  const handleUpdateDocument = (document: CaseDocumentDataTypes) => {
    setIsUpdating(true);
    setDocumentName(document.document_name);
    setUpdateDocumentId(document.document_id);
  };

  if (documentsLoading) {
    return <div className="text-center mt-20 text-lg font-semibold">Loading documents...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">📁 Document Report</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <BsSearch className="absolute top-4 right-4 text-gray-500 text-xl" />
        </div>

        {/* Upload/Update Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">{isUpdating ? 'Update Document' : 'Upload New Document'}</h3>

          <input
            type="text"
            placeholder="Document Name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            title='file'
            type="file"
            onChange={handleFileChange}
            className="mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isUpdating ? 'Update Document' : 'Upload Document'}
          </button>
        </form>

        {/* Document Table */}
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">File Icon</th>
              <th className="py-3 px-4">Document Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Case ID</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document: CaseDocumentDataTypes) => (
              <tr key={document.document_id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{getFileIcon(document.mime_type)}</td>
                <td className="py-3 px-4">{document.document_name}</td>
                <td className="py-3 px-4">{document.mime_type}</td>
                <td className="py-3 px-4">{formatFileSize(document.file_size)}</td>
                <td className="py-3 px-4">{document.case_id}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <a
                    href={document.document_url}
                    download
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    <AiOutlineDownload className="mr-2 text-xl" /> Download
                  </a>
                  <button
                    onClick={() => handleUpdateDocument(document)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center mt-20 text-lg font-semibold text-gray-500">
            No documents found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReport;
