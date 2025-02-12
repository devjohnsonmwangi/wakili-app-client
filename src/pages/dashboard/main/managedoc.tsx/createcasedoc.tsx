import { useState, useEffect, useRef } from "react";
import { useFetchCasesQuery } from "../../../../features/case/caseAPI";
import { useCreateCaseDocumentMutation } from "../../../../features/casedocument/casedocmentapi";
import { useCreateLogMutation } from "../../../../features/logs/logsapi";
import { judiciaryTemplates } from "../../../../utils/judiciaryTemplates";
import { Toaster, toast } from "sonner";

const DocumentUpload = () => {
  const { data: cases, isLoading } = useFetchCasesQuery();
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [createCaseDocument] = useCreateCaseDocumentMutation();
  const [createLog] = useCreateLogMutation();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customContent, setCustomContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && cases?.length) {
      setSelectedCaseId(cases[0].case_id);
    }
  }, [cases, isLoading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (!selectedCaseId || !file) {
      toast.error("Please select a case and upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("case_id", selectedCaseId.toString());
    formData.append("document_name", file.name);
    formData.append("file", file);
    formData.append("mime_type", file.type);
    formData.append("file_size", file.size.toString());

    // Log the form data before sending (for debugging)
    console.log("Data being sent (Upload):", {
      case_id: selectedCaseId,
      document_name: file.name,
      file: file, // Not JSON serializable, but included for context
      mime_type: file.type,
      file_size: file.size.toString(),
    });

    try {
      await createCaseDocument(formData).unwrap();
      await createLog({ action: `Uploaded document: ${file.name}` });
      toast.success("Document uploaded successfully!");
      resetForm(); // Reset form after successful upload
    } catch (error) {
      toast.error("Failed to upload document.");
      console.error("Upload Error:", error);
    }
  };

  const handleCreateDocument = async () => {
    if (!selectedCaseId || !selectedTemplate || !contentRef.current) {
      toast.error("Please select a case and a template.");
      return;
    }

    const templateName = selectedTemplate;
    const formattedContent = contentRef.current.innerHTML;
    const documentBlob = new Blob([formattedContent], { type: "text/html" });
    const documentUrl = URL.createObjectURL(documentBlob);
    const documentName = `${templateName}.html`;

    const formData = new FormData();
    formData.append("case_id", selectedCaseId.toString());
    formData.append("document_name", documentName);
    formData.append("document_url", documentUrl);
    formData.append("mime_type", "text/html");
    formData.append("file_size", documentBlob.size.toString());

    // Log the form data before sending (for debugging)
    console.log("Data being sent (Create):", {
      case_id: selectedCaseId,
      document_name: documentName,
      document_url: documentUrl,
      mime_type: "text/html",
      file_size: documentBlob.size.toString(),
    });

    try {
      await createCaseDocument(formData).unwrap();
      await createLog({ action: `Created document: ${documentName}` });
      toast.success("Document created successfully!");
      resetForm(); // Reset form after successful creation
    } catch (error) {
      toast.error("Failed to create document.");
      console.error("Create Document Error:", error);
    }
  };

  const resetForm = () => {
    setFile(null);
    setSelectedTemplate(null);
    setCustomContent("");
    // Optionally reset selectedCaseId if needed, but usually you'd want to keep it selected
    // setSelectedCaseId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold mb-4">Upload or Create Document</h2>
      <input
        type="text"
        placeholder="Search by case number or case truck number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Case ID</th>
              <th className="border p-2">Case Number</th>
              <th className="border p-2">Case Description</th>
              <th className="border p-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {cases?.filter(c =>
              c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.case_track_number.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((caseItem) => (
              <tr key={caseItem.case_id} className="hover:bg-gray-100">
                <td className="border p-2">{caseItem.case_id}</td>
                <td className="border p-2">{caseItem.case_number}</td>
                <td className="border p-2">{caseItem.case_description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedCaseId(caseItem.case_id)}
                    className={`px-3 py-1 rounded text-white ${selectedCaseId === caseItem.case_id ? "bg-green-500" : "bg-blue-500"}`}
                  >
                    {selectedCaseId === caseItem.case_id ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Upload a Document</h3>
        <input type="file" onChange={handleFileChange} className="p-2 border rounded w-full mb-4" title="upload file" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Upload Document
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Create a Document</h3>

        <select
          title="select template"
          className="p-2 border rounded w-full mb-4"
          value={selectedTemplate || ""} // controlled component
          onChange={(e) => {
            setSelectedTemplate(e.target.value);
            setCustomContent(judiciaryTemplates.find(t => t.name === e.target.value)?.content || "");
          }}
        >
          <option value="">Select Template</option>
          {judiciaryTemplates.map((template) => (
            <option key={template.name} value={template.name}>{template.name}</option>
          ))}
        </select>
        <div
          ref={contentRef}
          contentEditable
          className="p-4 border rounded w-full bg-gray-100 min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: customContent }}
        />
        <button onClick={handleCreateDocument} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 mt-4">
          Save Document
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;