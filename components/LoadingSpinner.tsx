import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-[85vw] h-[85vh] p-3">
        <div className="animate-pulse space-y-4 h-full">
          <div className="h-[10%] bg-dark-500 rounded"></div>
          <div className="grid grid-cols-3 gap-4 h-[30%]">
            <div className="bg-dark-500 rounded col-span-2"></div>
            <div className="bg-dark-500 rounded col-span-1"></div>
          </div>
          <div className="h-[5%] bg-dark-500 rounded"></div>
          <div className="grid grid-cols-2 gap-4 h-[45%]">
            <div className="bg-dark-500 rounded"></div>
            <div className="bg-dark-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex justify-center items-center h-full">
    //   <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    // </div>
    // <div className="animate-pulse flex flex-col space-y-4 p-4">
    //   <div className="h-10 bg-gray-200 rounded w-3/4"></div>
    //   <div className="h-10 bg-gray-200 rounded"></div>
    //   <div className="h-10 bg-gray-200 rounded w-5/6"></div>
    //   <div className="h-10 bg-gray-200 rounded w-4/6"></div>
    //   <div className="h-10 bg-gray-200 rounded w-2/3"></div>
    // </div>
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div> */}
    //   <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    // </div>
  );
};

export default LoadingSpinner;
