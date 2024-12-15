import { useEffect, useState } from 'react';
import { paymentAPI, PaymentDataTypes } from '../../../../features/payment/paymentAPI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';

const COLORS = ['#4CAF50', '#2196F3', '#FF5722', '#FFC107', '#E91E63'];

interface ChartData {
  name: string;
  value: number;
}

const PaymentReport = () => {
  const { data: paymentsData = [], isLoading: paymentsLoading } = paymentAPI.useFetchPaymentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [dailyPaymentsData, setDailyPaymentsData] = useState<ChartData[]>([]);
  const [statusData, setStatusData] = useState<ChartData[]>([]);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [averagePayment, setAveragePayment] = useState<number>(0);
  const [profitChange, setProfitChange] = useState<string>('');

  // Calculate chart sizes
  const [chartWidth, setChartWidth] = useState<number>(window.innerWidth < 768 ? 300 : 500);
  const [chartHeight, setChartHeight] = useState<number>(window.innerWidth < 768 ? 250 : 300);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? 300 : 500);
      setChartHeight(window.innerWidth < 768 ? 250 : 300);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!paymentsLoading && paymentsData.length > 0) {
      const dailyPayments: Record<string, number> = {};
      const statusCounts: Record<string, number> = { pending: 0, paid: 0, failed: 0 };

      let totalPaymentSum = 0;

      paymentsData.forEach((payment: PaymentDataTypes) => {
        const date = new Date(payment.payment_date).toLocaleDateString('en-US');
        const paymentAmount = parseFloat(payment.payment_amount || '0');
        dailyPayments[date] = (dailyPayments[date] || 0) + paymentAmount;
        totalPaymentSum += paymentAmount;
        statusCounts[payment.payment_status] = (statusCounts[payment.payment_status] || 0) + 1;
      });

      const dailyPaymentChartData = Object.entries(dailyPayments).map(([name, value]) => ({ name, value }));
      setDailyPaymentsData(dailyPaymentChartData);

      if (dailyPaymentChartData.length > 1) {
        const yesterdayPayment = dailyPaymentChartData[dailyPaymentChartData.length - 2]?.value || 0;
        const todayPayment = dailyPaymentChartData[dailyPaymentChartData.length - 1]?.value || 0;
        setProfitChange(todayPayment > yesterdayPayment ? 'increase' : 'decrease');
      }

      setTotalPayments(totalPaymentSum);
      setAveragePayment(totalPaymentSum / paymentsData.length);

      const formattedStatusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
      setStatusData(formattedStatusData);
    }
  }, [paymentsLoading, paymentsData]);

  if (paymentsLoading) {
    return <div className="text-center mt-20 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">📊 Payment Report</h2>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Total Payments</h3>
            <p className="text-3xl font-extrabold text-green-500">${totalPayments.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Average Payment</h3>
            <p className="text-3xl font-extrabold text-blue-500">${averagePayment.toFixed(2)}</p>
          </div>
        </div>

        {/* Profit Indicator */}
        <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Profit Change</h3>
          <div className="flex items-center justify-center">
            {profitChange === 'increase' ? (
              <BsArrowUpRight className="text-green-500 text-4xl" />
            ) : (
              <BsArrowDownRight className="text-red-500 text-4xl" />
            )}
            <p className={`text-2xl font-bold ml-2 ${profitChange === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {profitChange === 'increase' ? 'Increase 📈' : 'Decrease 📉'}
            </p>
          </div>
        </div>

        {/* Daily Payments Chart */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Daily Payments</h3>
          <BarChart width={chartWidth} height={chartHeight} data={dailyPaymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Payment Status Pie Chart */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Payment Status Distribution</h3>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius="80%" label>
              {statusData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
