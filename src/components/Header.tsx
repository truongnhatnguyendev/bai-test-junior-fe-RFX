import { Bell, ChevronDown, Home, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { IMAGES } from "../assets/index";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex bg-[#294172] p-2 h-[60px]">
      <div className="flex items-center">
        <div className="w-[200px] h-7">
          <img
            src={IMAGES.logo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center gap-3 ml-14">
          <Home
            size={32}
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className=" px-4 py-1 h-[44px] bg-[#DAE6EF] rounded-lg items-center justify-center">
            <p className="text-[#294172] text-xs font-normal">Module</p>
            <h3 className="text-[#294172] text-sm font-bold uppercase">
              User Management
            </h3>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4 mr-10">
        <Bell size={32} className="text-white" />
        <Settings size={32} className="text-white" />
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              loading="lazy"
              src={IMAGES.avatar}
              className="w-full h-full"
              alt="avatar"
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white text-sm leading-6 font-bold">
              Mr.David Nguyen
            </span>
            <span className="text-white text-xs font-normal">Home company</span>
          </div>
          <ChevronDown className="text-white" />
        </div>
      </div>
    </header>
  );
}
