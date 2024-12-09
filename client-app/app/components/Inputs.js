import { send, upload } from "@/public/assets";
import Image from "next/image";
import { useRef, useState } from "react";

const Inputs = ({ user, socket, setChat }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef(null);

  // sendMessage function
  const sendMessage = () => {
    if (input) {
      const msg = { content: input, type: "text", user };
      socket.emit("send_message", msg);
      socket.emit("user_typing", { user: user.name, typing: false });
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      uploadInput.current.click();
    }
  };

  // handleImageUpload function
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/webp" ||
      file.type === "image/svg"
    ) {
      const img = URL.createObjectURL(file);
      const msg = { content: img, type: "image", user };
      setChat((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
    }
  };

  // userTyping function
  const userTyping = (e) => {
    setInput(e.target.value);
    socket.emit("user_typing", {
      user: user.name,
      typing: e.target.value ? true : false,
    });
  };

  return (
    <div
      className="w-full flex items-center absolute bottom-0 text-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-300 to-90%   
        md:text-3x1 md:relative"
    >
      <div className="basis-11/12 ">
        <input
          className="focus:bottom-0 focus:outline-none py-2 px-4 w-full bg-transparent"
          type="text"
          placeholder="Enter your message"
          value={input}
          onChange={(e) => userTyping(e)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>

      <input
        type="file"
        className="hidden"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      />
      <button
        onClick={sendMessage}
        className="py-2 px-4 text-white font-fold text-center mx-auto text-xl bg-emerald-500 "
      >
        <Image
          src={input ? send : upload}
          className=" "
          alt="send"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Inputs;
