import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/users/userSlice'; // Assuming the logout action is in this slice

const Logout: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing

  const handleLogout = () => {  
    setIsLoggingOut(true);

    // Dispatch the logOut action to update the Redux state
    dispatch(logOut());

    // Optionally, clear any local storage or cookies if needed
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Optional: Clear cookies

    // After logout, navigate to the login page
    setTimeout(() => {
      navigate('/login'); // Navigate to login page
    }, 1500); // Simulate delay
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white-500 to-purple-600 p-6"
    style={{
        backgroundImage: 'url("https://th.bing.com/th?id=OIP.OIUE2RkT5TPHntk-QwpIhgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2")', // Replace with your background image URL
      }}
    >
      {/* Main container occupying 90% of the screen height */}
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 relative overflow-hidden max-h-[500vh]"
     
      
      >
        {/* Avatar Section with Animation */}
        {/* <div className="absolute top-0 right-0 -mt-20 -mr-20">
          <img
            src="https://th.bing.com/th?id=OIP.OIUE2RkT5TPHntk-QwpIhgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" // Replace with your avatar image URL
            alt="Avatar"
            className="h-32 w-32 rounded-full border-4 border-white transform scale-110 transition-all duration-300 animate-pulse"
          />
        </div> */}

        {/* Main Content */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Oops! 😱</h2>
          <p className="text-lg text-gray-600 mb-8">
            Are you sure you want to log out? <span role="img" aria-label="sad emoji">😢</span>
            <br />
            It's hard to say goodbye... 😓 But you'll come out stronger!
          </p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`px-6 py-3 bg-red-500 text-white text-lg rounded-full shadow-md hover:bg-red-600 transition-all ${
              isLoggingOut ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isLoggingOut ? 'Logging out...' : 'Log Out'}
          </button>

          {/* Option to Stay */}
          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              Are you sure you want to leave? <span role="img" aria-label="thinking emoji">🤔</span>
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-2 text-blue-500 hover:underline"
            >
              No, take me back to my dashboard
            </button>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-10">
          <p className="text-center text-sm text-gray-500">
            "Sometimes it's hard to let go, but you'll come out stronger."
          </p>
        </div>

        {/* Regret Emoji */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-4xl">
          <span role="img" aria-label="regret emoji">😓</span>
        </div>

        {/* Animated Progress Indicator */}
        {/* {isLoggingOut && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-12 w-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="30" />
              <path d="M14 2a10 10 0 1 1-2 0 10 10 0 0 1 2 0z" />
            </svg>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Logout;
