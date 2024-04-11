"use client";
import React, { FC, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { Circles, DNA } from "react-loader-spinner";
import Button from "@/ui-components/Button";
interface UserData {
  id: number;
  // Add other fields here
}
const AllUser = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonloading, setButtonLoading] = useState<boolean>(false);

  async function getUserData() {
    setLoading(true);
    try {
      const response = await axios.get("https://cointab-se-assignment-mr3g.onrender.com/users");
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData: UserData[] = response.data.user;
      setData(userData);
      setLoading(false);
      console.log(userData);
    } catch (error) {
      setLoading(false);
      console.error("Fetch error:", error);
    }
  }

  const updateUser = async (id: number) => {
    setButtonLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/update/${id}`,
        {
          // Add your update data here
        }
      );
      setButtonLoading(false);
      console.log(response.data); // Assuming the response contains updated user data

      // Update the state with the updated user data
      setData((prevData) =>
        prevData.map((user) => (user.id === id ? response.data.user[0] : user))
      );
    } catch (error) {
      setButtonLoading(false);
      console.error("Update error:", error);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center">
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
    <div>
      {data.length > 0 ? (
        <>
          <h1 className="text-center text-3xl font-extrabold gif-background rounded-2xl">
            All Users
          </h1>
          {data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
              {data.map((data: any) => (
                <UserCard
                  key={data.id}
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  website={data.website}
                  city={data.address.city}
                  id={+data.id}
                  alreadyPresent={data.alreadyPresent}
                  updateUser={updateUser}
                  companyName={data.company.name}
                  buttonloading={buttonloading}
                />
              ))}
              {buttonloading ? (
                <div className="absolute left-[25rem] bg-white rounded-2xl px-10 py-5">
                  <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <h3>No Data Found</h3>
          )}
        </>
      ) : (
        <Button
          className="bg-[#FE6192] p-5 px-10 rounded-xl font-bold text-white my-10 text-xl"
          onClick={getUserData}
        >
          All Users
        </Button>
      )}
    </div>
  );
};

export default AllUser;
