const Chat = () => {
  return (
    <div className="h-full ">
      <div className="w-full px-4 h-full max-h-screen overflow-y-auto bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600 pt-2 md:pt-6">
        <Message content=" how are you" own={true} />
        <Message content="I am Fine" own={false} />
      </div>
    </div>
  );
};

const Message = ({ content, own }) => {
  return (
    <p className={`px-6 py-1 flex ${own ? "justify-end" : ""}`}>
      <span
        className={`text-3xl px-6 py-2 rounded-2xl ${
          own ? "bg-sky-400 text-white" : "bg-slate-300"
        }`}
      >
        {content}
      </span>
    </p>
  );
};

export default Chat;
