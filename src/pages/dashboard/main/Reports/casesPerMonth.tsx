import { useEffect, useState } from 'react';
import { BarChart, LineChart, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer, Cell } from 'recharts';
import { caseAndPaymentAPI, CaseDataTypes } from '../../../../features/case/caseAPI';

interface ChartData {
  name: string;
  [key: string]: number | string; 
}

const CasesPerMonth = () => {
  const page = undefined;
  const fetchDuration = 10000;
  const { data: cases } = caseAndPaymentAPI.useFetchCasesQuery(page, {
    pollingInterval: fetchDuration,
    refetchOnMountOrArgChange: true,
  });

  const [caseTypeData, setCaseTypeData] = useState<ChartData[]>([]);
  const [caseStatusData, setCaseStatusData] = useState<ChartData[]>([]);
  const [paymentStatusData, setPaymentStatusData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (cases) {
      // 1️⃣ Group cases by month and case_type
      const casesByType = cases.reduce((acc: { [key: string]: { [type: string]: number } }, caseData: CaseDataTypes) => {
        const monthYear = new Date(caseData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const caseType = caseData.case_type || 'Unknown Type';

        if (!acc[monthYear]) acc[monthYear] = {};
        if (!acc[monthYear][caseType]) acc[monthYear][caseType] = 0;

        acc[monthYear][caseType]++;
        return acc;
      }, {});

      const typeChartData = Object.keys(casesByType).map((month) => {
        const monthData: ChartData = { name: month };
        Object.keys(casesByType[month]).forEach((type) => {
          monthData[type] = casesByType[month][type];
        });
        return monthData;
      });
      setCaseTypeData(typeChartData);

      // 2️⃣ Group cases by month and case_status
      const casesByStatus = cases.reduce((acc: { [key: string]: { [status: string]: number } }, caseData: CaseDataTypes) => {
        const monthYear = new Date(caseData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const caseStatus = caseData.case_status || 'Unknown Status';

        if (!acc[monthYear]) acc[monthYear] = {};
        if (!acc[monthYear][caseStatus]) acc[monthYear][caseStatus] = 0;

        acc[monthYear][caseStatus]++;
        return acc;
      }, {});

      const statusChartData = Object.keys(casesByStatus).map((month) => {
        const monthData: ChartData = { name: month };
        Object.keys(casesByStatus[month]).forEach((status) => {
          monthData[status] = casesByStatus[month][status];
        });
        return monthData;
      });
      setCaseStatusData(statusChartData);

      // 3️⃣ Group cases by payment status
      const paymentStatusCount = cases.reduce((acc: { [status: string]: number }, caseData: CaseDataTypes) => {
        const paymentStatus = caseData.payment_status || 'Unknown Payment Status';
        if (!acc[paymentStatus]) acc[paymentStatus] = 0;
        acc[paymentStatus]++;
        return acc;
      }, {});

      // Convert to chart data
      const paymentStatusChartData = Object.keys(paymentStatusCount).map((status) => ({
        name: status,
        value: paymentStatusCount[status],
      }));
      setPaymentStatusData(paymentStatusChartData);
    }
  }, [cases]);

  return (
    <div className="bg-slate-200 p-4">
      {/* Booking Per Month (Case Type) */}
      <div className="card mx-auto bg-white w-full rounded-md border-2 p-4 mb-8">
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Case Per Month (Case Type)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={caseTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {caseTypeData.length > 0 &&
              Object.keys(caseTypeData[0])
                .filter((key) => key !== 'name')
                .map((key, index) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={getRandomColor(index)} />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Per Month (Case Status) */}
      <div className="card mx-auto bg-white w-full rounded-md border-2 p-4 mb-8">
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Case Per Month (Case Status)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={caseStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {caseStatusData.length > 0 &&
              Object.keys(caseStatusData[0])
                .filter((key) => key !== 'name')
                .map((key, index) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={getRandomColor(index)} />
                ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Status Pie Chart */}
      <div className="card mx-auto bg-white w-full rounded-md border-2 p-4">
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Case Payment Status</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie 
              data={paymentStatusData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={120} 
              fill="#8884d8" 
              label 
            >
              {paymentStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor(index)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CasesPerMonth;

/**
 * Utility function to generate random colors.
 */
const getRandomColor = (index: number) => {
  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#d45087', 
    '#a05195', '#f95d6a', '#2f4b7c', '#ff7c43', 
    '#665191', '#a05195', '#d45087', '#ff6347',
  ];
  return colors[index % colors.length];
};
