import PostCard from "@/app/Components/Post/PostCard";
import axios from "axios";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Posts",
};
const Post = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );

    if (response.status !== 200 || userResponse.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    var data = response.data.posts;
    var userData = userResponse.data[0];
    console.log(userData);
  } catch (error) {
    console.error("Error while fetching:");
  }
  return (
    <main className="w-[90%] md:w-[70%] mx-auto my-10">
      <div className="flex justify-between">
        <div className="text-xl font-mono font-bold">
          Details:
          <h2 className="font-extrabold">Name:{userData.name}</h2>
          <h2 className="font-extrabold">Company:{userData.company.name}</h2>
        </div>
        <div>
          <button className="p-4 px-7 bg-[#00D48C] rounded-xl">Bulk Add</button>
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
