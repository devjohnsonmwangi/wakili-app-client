import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <div className="flex items-center mb-4">
          <ArrowLeftToLine className="h-6 w-6 text-red-500" />
          <Link to="/dashboard/payments" className="text-red-500 ml-2">Back to Dashboard</Link>
        </div>
        <div className="bg-white p-10 rounded-lg shadow-md text-center">
           
          <svg
            className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
          <p className="text-gray-700">Sorry, your payment has failed.</p>
        </div>
      </div>
    );
  };
  
  export default PaymentFailed;
  