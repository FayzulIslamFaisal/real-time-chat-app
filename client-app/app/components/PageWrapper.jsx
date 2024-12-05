"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Chat, Inputs, SignUp } from "@/app/components";
const socket = io("http://localhost:3001");
const PageWrapper = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const user = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <>
      <div className=" h-screen max-h-screen mx-auto md:container md:p-20 md:pt-4 ">
        {user.current ? (
          <>
            <Chat chat={chat} user={user.current} />
            <Inputs setChat={setChat} user={user.current} socket={socket} />
          </>
        ) : (
          <SignUp
            user={user}
            socket={socket}
            setInput={setInput}
            input={input}
          />
        )}
      </div>
    </>
  );
};

export default PageWrapper;
