import { send } from "@/public/assets";
import Image from "next/image";

const Inputs = () => {
  return (
    <div
      className="w-full flex items-center absolute bottom-0 text-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-300 to-90%   
        md:text-3x1 md: relative"
    >
      <div className="basis-11/12 ">
        <input
          className="focus:bottom-0 focus:outline-none py-2 px-4 w-full bg-transparent"
          type="text"
          placeholder="Enter your message"
        />
      </div>

      <button className="py-2 px-4 text-white font-fold text-center mx-auto text-xl bg-emerald-500 ">
        <Image src={send} className=" " alt="send" height={20} width={20} />
      </button>
    </div>
  );
};

export default Inputs;
