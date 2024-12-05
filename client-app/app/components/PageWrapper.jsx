"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Chat, Inputs, SignUp } from "@/app/components";
const socket = io("http://localhost:3001");
const PageWrapper = () => {
  const user = useRef("hello");

  return (
    <>
      <div className=" h-screen max-h-screen mx-auto md:container md:p-20 md:pt-4 ">
        {user.current ? (
          <>
            <Chat />
            <Inputs />
          </>
        ) : (
          <SignUp />
        )}
      </div>
    </>
  );
};

export default PageWrapper;
