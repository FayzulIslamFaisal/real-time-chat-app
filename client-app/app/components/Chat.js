import Image from "next/image";

const Chat = ({ chat, user }) => {
  return (
    <div className="h-full ">
      <div className="w-full px-4 h-full max-h-screen overflow-y-auto bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600 pt-2 md:pt-6">
        {chat.map((message, index) => {
          message = { ...message, own: message.user.id === user.id };
          return <Message key={index} {...message} />;
        })}

        {/* <Message content="I am Fine" own={false} /> */}
      </div>
    </div>
  );
};

const Message = ({ content, type, own }) => {
  console.log("type", type);

  return (
    <p className={`message py-1 flex ${own ? "justify-end" : ""}`}>
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

export default Chat;
