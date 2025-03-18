import React from "react";

const LoadingCircle = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[36px] h-[36px] border-[4px] border-solid border-[#E56E50] border-r-transparent border-b-transparent rounded-full animate-spin-slow"></div>
    </div>
  );
};

export default LoadingCircle;
