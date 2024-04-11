import Image from "next/image";
import AllUser from "./Components/Homepage/AllUser";
import Button from "@/ui-components/Button";
import axios from "axios";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="flex w-[90%] md:w-[70%] mx-auto md:items-center mt-16">
        <div className="">
          <h1 className="text-5xl font-bold">
            Welcome to Cointab SE-ASSIGNMENT
          </h1>
        </div>

        <div>
          <img
            src="https://i0.wp.com/networknuts.net/wp-content/uploads/2019/11/zahir-accounting-software-have-more-than-60.000-users.png"
            alt="heroImage"
            className="hidden md:block"
          />
        </div>
      </div>

      {/* User Section */}
      <section className="mt-10 w-[95%] md:w-[70%] mx-auto my-16 relative">
        <AllUser />
      </section>
    </main>
  );
}
