import * as React from "react";

export const PageUserInfo: React.FC = () => (
  <div className="text-center">
    <div className="inline-flex flex-row justify-center items-center my-5 p-6 border">
      <img style={{height: "90px", width: "90px"}} className="object-cover rounded-full ring-4 ring-primary" src={"TestUser.jpg"}></img>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row mb-2">
          <h1 className="text-white font-bold text-lg text-left mx-6">Mark Brown#1234</h1>
          <h1 className="text-white text-right mx-6 hover:underline hover:cursor-pointer">Log Out</h1>
        </div>
        <h1 className="text-white text-center mx-6">Team Status:</h1>
        <h1 className="text-white text-center mx-6">No Team Registered</h1>
      </div>
    </div>
  </div>
);
