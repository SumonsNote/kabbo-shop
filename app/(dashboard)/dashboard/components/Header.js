import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenu5Line } from "react-icons/ri";

export default function Header({ setIsCollapsed, isCollapsed }) {
  const { data: session, status } = useSession();

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
        {session?.user?.id && (
          <div className="flex items-center gap-2">
            <User className="size-8 text-slate-200" />
            <span className="text-gray-200">
              {session?.user?.first_name} {session?.user?.last_name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
