import CartIcon from "@/app/admin/_icons/ShoppingCart";
import { useState } from "react";
import ShoppingCartIcon from "../_icons/shoppingCartIcon";
import XIconWhite from "../_icons/XIconWhite";

export default function CartItems() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-white rounded-full"
      >
        <CartIcon />
      </div>

      {open && (
        <div
          className="
            fixed inset-0 
            bg-black/40 
            flex justify-end 
            z-50
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="h-screen w-[600px] bg-neutral-700 p-8 gap-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-center">
                <ShoppingCartIcon />
                <div className="text-[20px] text-white font-bold">
                  Order detail
                </div>
              </div>
              <div onClick={() => setOpen(false)} className="cursor-pointer">
                <XIconWhite />
              </div>
            </div>

            <div className="w-full bg-white rounded-full h-11 p-1 gap-2 flex flex-row">
              <div
                onClick={() => setActiveTab("cart")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer
                  ${
                    activeTab === "cart"
                      ? "bg-red-500 text-white"
                      : "text-black"
                  }
                `}
              >
                Cart
              </div>

              <div
                onClick={() => setActiveTab("order")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer
                  ${
                    activeTab === "order"
                      ? "bg-red-500 text-white"
                      : "text-black"
                  }
                `}
              >
                Order
              </div>
            </div>

            <div className="text-white mt-5">
              {activeTab === "cart" && (
                <div>
                  <p>Cart items will be shown here...</p>
                </div>
              )}

              {activeTab === "order" && (
                <div>
                  <p>Order information will be shown here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
