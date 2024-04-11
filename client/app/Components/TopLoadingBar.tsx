"use client";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress < 100) setProgress(progress + 10);
  }, [progress]);
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex justify-center items-center h-full">
        <Circles
          height="180"
          width="180"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};

export default TopLoadingBar;
