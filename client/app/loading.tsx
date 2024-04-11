import React from "react";
import Skeleton from "react-loading-skeleton";
import TopLoadingBar from "@/app/Components/TopLoadingBar";

const loading = () => {
  return (
    <div>
      <TopLoadingBar />
      <Skeleton count={50} />
    </div>
  );
};

export default loading;
