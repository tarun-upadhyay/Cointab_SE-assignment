import Button from "@/ui-components/Button";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { DNA } from "react-loader-spinner";
interface UserDataProps {
  name: string;
  email: string;
  phone: string;
  website: string;
  id: number;
  city: string;
  companyName: string;
  alreadyPresent: boolean;
  updateUser: (id: number) => void;
  buttonloading: boolean;
}
const UserCard: React.FC<UserDataProps> = ({
  name,
  email,
  phone,
  website,
  updateUser,
  city,
  companyName,
  id,
  buttonloading,
  alreadyPresent,
}) => {
  return (
    <div className="shadow-xl px-6 pt-5 rounded-xl mt-3 relative">
      <h2 className="text-xl font-mono font-bold">Name: {name}</h2>
      <p>
        <span className="text-bold text-lg font-serif">Email:</span> {email}
      </p>
      <p>
        <span className="text-bold text-lg font-serif">Phone:</span>
        {phone}
      </p>
      <p>
        <span className="text-bold text-lg font-serif">Website:</span> {website}
      </p>
      <p>
        <span className="text-bold text-lg font-serif">City:</span> {city}
      </p>
      <p>
        <span className="text-bold text-lg font-serif">Company:</span>
        {companyName}
      </p>

      {alreadyPresent ? (
        <Link href={`/post/${id}`}>
          <button className="px-8 py-3 bg-[#FE6192] rounded-2xl text-white m-5">
            Open
          </button>
        </Link>
      ) : (
        <button
          className="px-8 py-3 bg-[#074173] rounded-2xl text-white m-5"
          onClick={() => updateUser(id)}
          disabled={buttonloading}
        >
          Add
        </button>
      )}
      
    </div>
  );
};

export default UserCard;
