"use client";

import HeaderIcon from "../../admin/_icons/HeaderIcon";
import HeaderAccount from "./Account";
import CartItems from "./CartItems";
import DeliverLocation from "./DeliveryLocation";

export default function Header() {
  const token = localStorage.getItem("token");
  return (
    <div className="w-full h-[172px] bg-[#18181B] flex flex-row justify-between items-center p-22">
      <div
        className="flex flex-row gap-3 items-center
      "
      >
        <div>
          <HeaderIcon />
        </div>
        <div>
          <div className="text-[20px] text-white font-bold">
            Nom<span className="text-[#EF4444]">Nom</span>
          </div>
          <div className="text-[12px] text-white">Swift delivery</div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="">
          {token ? (
            <div className="flex gap-3">
              <DeliverLocation />
              <CartItems />
              <HeaderAccount />
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <div className="cursor-pointer h-9 bg-white text-black flex justify-center items-center rounded-full px-3 py-2">
                Sign Up
              </div>
              <div className="cursor-pointer h-9 bg-red-500 text-white flex items-center justify-center rounded-full px-3 py-2">
                Login
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
