
function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning 3D ring loader */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin-fast border-t-transparent border-l-transparent"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-dashed rounded-full animate-spin-slow border-t-transparent border-r-transparent"></div>
        </div>

        {/* Pulsating text */}
        <p className="text-white text-xl font-bold animate-fade-in-out tracking-wide">
          Loading<span className="animate-bounce">...</span>
        </p>
      </div>
    </div>
  );
}

export default Loader;
