import React from "react";
import Skeleton from "react-loading-skeleton";
import TopLoadingBar from "@/app/Components/TopLoadingBar";
import { Circles } from "react-loader-spinner";

const loading = () => {
  return (
    <div>
      <TopLoadingBar />
    </div>
  );
};

export default loading;
