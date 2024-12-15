import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { AiOutlineFile, AiOutlineDownload } from 'react-icons/ai';
import { BiFilePdf, BiFileImage, BiFile } from 'react-icons/bi';
import { documentAPI, CaseDocumentDataTypes } from '../../../../features/document/documentAPI';

Chart.register(...registerables);

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes('image')) return <BiFileImage className="text-blue-500 text-3xl" />;
  if (mimeType.includes('pdf')) return <BiFilePdf className="text-red-500 text-3xl" />;
  return <BiFile className="text-gray-500 text-3xl" />;
};

const DocumentReport = () => {
  const { data: documentsData = [], isLoading: documentsLoading } = documentAPI.useFetchDocumentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [documentTypesCount, setDocumentTypesCount] = useState<Record<string, number>>({});
  const [totalDownloads, setTotalDownloads] = useState<number>(0);

  useEffect(() => {
    if (!documentsLoading && documentsData.length > 0) {
      // Count document types
      const typeCount: Record<string, number> = {};
      let totalDownloadsCount = 0;

      documentsData.forEach((doc) => {
        const type = doc.mime_type.split('/')[1] || 'unknown';
        typeCount[type] = (typeCount[type] || 0) + 1;

        // Simulate download count (this could come from a real API)
        const randomDownloads = Math.floor(Math.random() * 100); // Simulated download count
        totalDownloadsCount += randomDownloads;
      });

      setDocumentTypesCount(typeCount);
      setTotalDownloads(totalDownloadsCount);

      // Initialize the charts
      initializeCharts(typeCount);
    }
  }, [documentsLoading, documentsData]);

  const initializeCharts = (typeCount: Record<string, number>) => {
    // Pie Chart for Document Types
    const typeChartCtx = document.getElementById('typeChart') as HTMLCanvasElement;
    new Chart(typeChartCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(typeCount),
        datasets: [
          {
            label: 'Document Types',
            data: Object.values(typeCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
          },
        ],
      },
    });

    // Bar Chart for Downloads
    const downloadChartCtx = document.getElementById('downloadChart') as HTMLCanvasElement;
    new Chart(downloadChartCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(typeCount),
        datasets: [
          {
            label: 'Downloads',
            data: Object.values(typeCount).map((count) => Math.floor(Math.random() * 100)),
            backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB', '#FFCE56', '#9C27B0'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  if (documentsLoading) {
    return <div className="text-center mt-20 text-lg font-semibold">Loading report...</div>;
  }

  const totalDocuments = documentsData.length;

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">📊 Document Report</h2>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <AiOutlineFile className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Total Documents</h3>
            <p className="text-3xl font-extrabold text-gray-800">{totalDocuments}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <AiOutlineDownload className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Total Downloads</h3>
            <p className="text-3xl font-extrabold text-gray-800">{totalDownloads}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <BiFile className="text-gray-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Document Types</h3>
            <p className="text-3xl font-extrabold text-gray-800">{Object.keys(documentTypesCount).length}</p>
          </div>
        </div>

        {/* Document Types Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
          <h3 className="text-xl font-bold text-center mb-4">📄 Document Types</h3>
          <canvas id="typeChart"></canvas>
        </div>

        {/* Download Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold text-center mb-4">📥 Downloads per Document Type</h3>
          <canvas id="downloadChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default DocumentReport;
