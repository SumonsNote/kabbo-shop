import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenu5Line } from "react-icons/ri";

export default async function Header({ setIsCollapsed, isCollapsed }) {
  // const session = await auth();
  // console.log(session);
  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center z-50  ">
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {!isCollapsed ? (
          <CgMenuMotion className="w-6 h-6" />
        ) : (
          <RiMenu5Line className="w-6 h-6" />
        )}
      </button>
      <div className="hidden sm:block">
        <div className="flex items-center bg-inherit px-4 rounded-full w-full border border-gray-400">
          {/* search */}
          <AiOutlineSearch className="w-6 h-6 text-gray-400" />
          <input
            type="search"
            placeholder="Search.."
            className="w-full px-5 py-2 rounded-md outline-none bg-inherit text-gray-400 min-w-96"
          />
        </div>
      </div>
      <div className="flex items-center gap-8 sm:pr-20">
        <div className="flex items-center">
          <Image
            src="/profile-pic.jpg"
            width={40}
            height={40}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-400">sumon Doe</span>
        </div>
      </div>
    </div>
  );
}
