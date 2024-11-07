import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenu5Line } from "react-icons/ri";

export default function Header({ setIsCollapsed, isCollapsed }) {
  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center ">
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {!isCollapsed ? (
          <CgMenuMotion className="w-6 h-6" />
        ) : (
          <RiMenu5Line className="w-6 h-6" />
        )}
      </button>
      <div>
        <div className="flex items-center bg-background text-foreground   px-4 rounded-lg w-96">
          {/* search */}
          <AiOutlineSearch className="w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search.."
            className="w-full px-4 py-2 rounded-md outline-none "
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Image
            src="/profile-pic.jpg"
            width={40}
            height={40}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-400">John Doe</span>
        </div>
      </div>
    </div>
  );
}
