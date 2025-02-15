import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/add"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img src={assets.add_icon} className="w-5 h-5" alt="Add new items" />
          <p className="hidden md:block">Add New Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img
            src={assets.order_icon}
            className="w-5 h-5"
            alt="View item list"
          />
          <p className="hidden md:block">View Item List</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img
            src={assets.order_icon}
            className="w-5 h-5"
            alt="Manage orders"
          />
          <p className="hidden md:block">Manage Orders</p>
        </NavLink>
      </div>
    </div>
  );
}
