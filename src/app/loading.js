const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h1 className="text-xl ext-2xl font-bold text-gray-800 mb-2">
        Loading...
      </h1>
      <p className="text-gray-600">Please wait while we fetch the data.</p>
    </div>
  );
};

export default LoadingPage;
