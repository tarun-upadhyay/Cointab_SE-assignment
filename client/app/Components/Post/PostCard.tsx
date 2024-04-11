import React, { FC } from "react";
interface Post {
  title: string;
  body: string;
}
const PostCard: FC<Post> = ({ title, body }) => {
  return (
    <div className="shadow-xl p-5 mt-5 rounded-2xl hover:translate-x-5 hover:translate-y-2  cursor-pointer">
      <h1>Title: {title}</h1>
      <h4>Body: {body}</h4>
    </div>
  );
};

export default PostCard;
