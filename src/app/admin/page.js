"use client";

import { useState } from "react";
import HeaderIcon from "../_icons/HeaderIcon";
import FoodMenuAdmin from "../_icons/MenuIcon";
import TruckIcon from "../_icons/TruckIcon";
import AvatarIcon from "../_icons/AvatarIcon";

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("food");

  return (
    <div className="flex min-h-screen bg-[#F4F4F5]">
      <div className="flex flex-col w-[220px] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <HeaderIcon />
          <div>
            <div className="text-[20px] text-black font-bold leading-tight">
              NomNom
            </div>
            <div className="text-[12px] text-[#71717A]">Swift delivery</div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div
            onClick={() => setActiveMenu("food")}
            className={`flex items-center gap-3 w-full h-11 px-4 rounded-xl cursor-pointer transition-all duration-200
              ${
                activeMenu === "food"
                  ? "bg-[#F4F4F5] font-semibold text-black"
                  : "text-[#71717A] hover:bg-[#F9F9FA] hover:text-black"
              }`}
          >
            <FoodMenuAdmin
              className={`transition ${
                activeMenu === "food" ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="text-[15px]">Food menu</span>
          </div>

          <div
            onClick={() => setActiveMenu("orders")}
            className={`flex items-center gap-3 w-full h-11 px-4 rounded-xl cursor-pointer transition-all duration-200
              ${
                activeMenu === "orders"
                  ? "bg-[#F4F4F5] font-semibold text-black"
                  : "text-[#71717A] hover:bg-[#F9F9FA] hover:text-black"
              }`}
          >
            <TruckIcon
              className={`transition ${
                activeMenu === "orders" ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="text-[15px]">Orders</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[#E4E4E7] flex items-center gap-3">
          <AvatarIcon />
          <span className="text-[14px] text-[#52525B] font-medium">Admin</span>
        </div>
      </div>

      <div className="flex-1 px-10 py-6">
        {activeMenu === "food" && (
          <div className="flex flex-col w-full border-gray-100 h-[948px] items-end gap-6">
            <div className="w-9 h-9">
              <AvatarIcon />
            </div>
            <div className="flex flex-row bg-[#FFF] justify-between w-full p-4 items-center border-t border-[#E4E4E7] rounded-lg shadow-sm">
              <div className="flex flex-col">
                <div className="font-bold text-[20px]">Food Menu</div>
                <div className="text-[12px] text-[#71717A]">
                  Manage your restaurant items
                </div>
              </div>
              <div className="flex flex-row w-[525px] justify-between">
                <div className="w-[300px] h-9 items-center justify-center flex border border-[#E4E4E7] rounded-full">
                  Calendar
                </div>
                <div className="w-[213px] h-9 flex items-center justify-center border-[#E4E4E7] rounded-full">
                  Add new item
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "orders" && (
          <div className="flex flex-col w-full h-[948px] gap-6">
            <div className="flex justify-end">
              <div className="w-9 h-9">
                <AvatarIcon />
              </div>
            </div>

            <div className="flex flex-row bg-[#FFF] justify-between w-full p-4 items-center border-t border-[#E4E4E7] rounded-lg shadow-sm">
              <div className="flex flex-col">
                <div className="font-bold text-[20px]">Orders</div>
                <div className="text-[12px] text-[#71717A]">
                  Track and manage customer orders
                </div>
              </div>
              <div className="flex flex-row w-[525px] justify-between">
                <div className="w-[300px] h-9 items-center justify-center flex border border-[#E4E4E7] rounded-full">
                  Calendar
                </div>
                <div className="w-[213px] h-9 flex items-center justify-center border-[#E4E4E7] rounded-full">
                  Change Status
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
