"use client";

import { useState } from "react";
import PlusIcon from "../_icons/plusIcon";
import XIcon from "../_icons/XIcon";
import { XCircleIcon } from "lucide-react";
import { number } from "yup";
import QuantityMinusIcon from "../_icons/quantityMinusIcon";
import QuantityPlusIcon from "../_icons/quantityPlusIcon";

export default function UserFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
  _id,
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((q) => q + 1);
  };

  const decrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const totalPrice = foodPrice * quantity;

  console.log("id", _id);
  return (
    <div className="w-[397px] bg-white rounded-[20px] p-4 gap-5 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
        className="h-[210px] bg-cover rounded-xl bg-center p-5 flex justify-end items-end"
      >
        <div
          onClick={() => setOpen(true)}
          className="
       cursor-pointer w-11 h-11 rounded-full flex justify-center items-center bg-white"
        >
          <PlusIcon />
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-[24px] text-red-500">{foodName}</div>
          <div className="text-[18px] font-bold">{foodPrice}₮</div>
        </div>
        <div className="text-[14px] w-full">{foodIngredients}</div>
      </div>
      {open && (
        <div
          className="
            fixed inset-0 
            bg-black/40 
            flex items-center justify-center 
            z-50
          "
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[826px] h-[412px] bg-white p-6 flex flex-row gap-6"
          >
            <div
              style={{
                backgroundImage: `url(${foodImage})`,
              }}
              className="w-[377px] h-[364px] bg-cover rounded-xl"
            ></div>
            {/* product info */}
            <div className="w-[377px] h-[364px] flex flex-col bg-gray-100 p-3">
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer w-9 h-9 border rounded-full border-[#E4E4E7] flex justify-center items-center self-end"
              >
                <XIcon />
              </div>

              <div className="flex flex-col justify-between h-[328px]">
                <div className="flex flex-col gap-3">
                  <div className="text-[30px] text-red-500">{foodName}</div>
                  <div className="text-[16px]">{foodIngredients}</div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-row justify-between">
                    <div>
                      <div className="text-[16px]">Total price</div>
                      <div className="text-[24px]">{totalPrice}₮</div>
                    </div>

                    <div className="flex flex-row gap-3 items-center">
                      <div
                        onClick={decrease}
                        className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                      >
                        <QuantityMinusIcon />
                      </div>
                      <div>{quantity}</div>
                      <div
                        onClick={increase}
                        className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                      >
                        <QuantityPlusIcon />
                      </div>
                    </div>
                  </div>

                  <button className="text-white bg-black w-full h-[44px] rounded-full">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
