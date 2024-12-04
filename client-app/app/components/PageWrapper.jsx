"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Chat, Inputs, SignUp } from "@/app/components";
const socket = io("http://localhost:3001");
const PageWrapper = () => {
  const user = useRef(null);
  useEffect(() => {
    // Listen for 'click_smt' event
    socket.on("click_smt", () => {
      console.log("Button Clicked: Received 'click_smt' event!");
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("click_smt");
    };
  }, []);
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
