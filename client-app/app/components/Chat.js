import { new_user } from "@/public/assets";
import Image from "next/image";
import { useRef } from "react";

const Chat = ({ chat, user, typing }) => {
  const scroller = useRef(null);
  return (
    <div className="h-full ">
      <div className="w-full px-4 h-full max-h-screen overflow-y-auto bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600 pt-2 md:pt-6">
        {chat.map((message, index) => {
          message = { ...message, own: message.user.id === user.id };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...message} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6"></div>
      </div>
    </div>
  );
};

const Message = ({ content, type, own, user }) => {
  console.log("type", type, user);

  return (
    <p className={`message py-1 flex ${own ? "justify-end" : ""}`}>
      {!own && (
        <span className="text-2xlbg-blue-600text-white rounded-full text-center px-4 mr-2 flex items-center">
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`text-xl rounded-2xl
          ${type === "text" ? "px-4 py-1 " : "bg-transparent rounded-md"}
           ${own ? "bg-sky-400 text-white" : "bg-slate-300"}`}
      >
        {type === "text" ? (
          content
        ) : (
          <Image
            src={content}
            alt="image"
            className="max-w-full"
            width={300}
            height={200}
          />
        )}
      </span>
    </p>
  );
};

const Typing = ({ user }) => {
  return (
    <div className="px-6 py-1 flex">
      <span className="text-2xlbg-blue-600text-white rounded-full text-center px-4 mr-2 flex items-center">
        {user.charAt(0).toUpperCase()}
      </span>
      <div className="loaderbg-slate-300 rounded-2x1 p-5">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const ServerMessage = ({ content }) => {
  return (
    <p className="px-6 py-1 flex">
      <span className="text-3xl text-white flex bg-transparent">
        <Image
          src={new_user}
          alt="image"
          className="max-w-full"
          width={32}
          height={32}
        />
        {content}
      </span>
    </p>
  );
};

export default Chat;
