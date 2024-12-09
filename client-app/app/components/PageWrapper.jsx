"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Chat, Inputs, SignUp } from "@/app/components";
const socket = io("http://localhost:3001");
const PageWrapper = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState([]);

  const user = useRef(null);

  useEffect(() => {
    // receive_message
    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    // user_typing
    socket.on("user_typing", (data) => {
      console.log("data", data);
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    // new_user
    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} Joined`, type: "server" },
      ]);
    });
    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, []);

  return (
    <>
      <div className=" h-screen max-h-screen mx-auto md:container md:p-20 md:pt-4 ">
        {user.current ? (
          <>
            <Chat chat={chat} user={user.current} typing={typing} />
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
