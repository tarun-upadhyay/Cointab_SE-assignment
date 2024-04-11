"use client";
import BulkDownld from "@/app/Components/Post/BulkDownld";
import PostCard from "@/app/Components/Post/PostCard";
import { ToastContainer, toast } from "react-toastify";

import Button from "@/ui-components/Button";
import axios from "axios";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const Post = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddedDb, setIsAddedDb] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const notify = (msg: string) => toast(`${msg}`);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts/${id}`);
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users?id=${id}`
        );

        if (response.status !== 200 || userResponse.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoading(false);
        setData(response.data.posts);
        console.log(response.data);
        setIsAddedDb(response.data.isAddedDb);
        setUserData(userResponse.data[0]);
      } catch (error) {
        setLoading(false);
        console.error("Error while fetching:");
      }
    })();
  }, [id]);

  async function handleBulkAdd() {
    try {
      const response = await axios.post(`/api/posts`, {
        data,
      });
      setIsAddedDb(true);
      notify("Added successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleExcelDownload = async () => {
    try {
      const response = await axios.get(`/api/posts/excelDownload/${id}`, {
        responseType: "blob", // Important for handling binary data
      });

      // Create a Blob from the binary data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `posts_${id}.xlsx`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      notify("Something went wrong Please try again");
      console.error("Error downloading Excel:", error);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <main className="w-[95%] md:w-[70%] mx-auto my-10">
      <ToastContainer />

      <div className="flex justify-between">
        <div className="text-xl font-mono font-bold">
          Details:
          <h2 className="font-extrabold">
            Name:{userData?.name && userData.name}
          </h2>
          <h2 className="font-extrabold">
            Company:{userData?.company && userData.company.name}
          </h2>
        </div>
        <div>
          {isAddedDb ? (
            <Button
              className="p-4 md:px-7 bg-[#00D48C] rounded-xl text-dark font-extrabold"
              onClick={handleExcelDownload}
            >
              Download in Excel
            </Button>
          ) : (
            data.length > 0 && (
              <Button
                className="p-4 md:px-7 bg-[#FE6192] rounded-xl text-dark font-extrabold"
                onClick={handleBulkAdd}
              >
                Bulk Add
              </Button>
            )
          )}
        </div>
      </div>
      {data.length > 0 &&
        data.map(
          ({
            title,
            body,
            id,
          }: {
            title: string;
            body: string;
            id: number;
          }) => <PostCard key={id} title={title} body={body} />
        )}
    </main>
  );
};

export default Post;
