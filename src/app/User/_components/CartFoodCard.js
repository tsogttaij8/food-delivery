"use client";

import QuantityMinusIcon from "../_icons/quantityMinusIcon";
import QuantityPlusIcon from "../_icons/quantityPlusIcon";
import XIconRed from "../_icons/XIconRed";

export default function CartFoodCard({ item, increase, decrease }) {
  const { foodName, foodIngredients, foodImage, foodPrice, quantity } = item;
  const totalPrice = foodPrice * quantity;

  return (
    <div className="flex flex-row gap-4 bg-white rounded-[20px] p-4 items-center shadow-md">
      <div
        className="w-[124px] h-[120px] bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${foodImage})` }}
      ></div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex-1 flex flex-col h-20">
            <div className="text-[18px] font-bold text-red-500">{foodName}</div>
            <div className="text-[14px] text-gray-700">{foodIngredients}</div>
            {/* <div className="text-[14px] text-gray-700">Price: {foodPrice}₮ x {quantity}</div> */}
          </div>
          <div className="ml-2 cursor-pointer w-9 h-9 border border-red-500 rounded-full flex justify-center items-center">
            <XIconRed />
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <div
              onClick={decrease}
              className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
            >
              <QuantityMinusIcon />
            </div>
            <div className="text-black">{quantity}</div>
            <div
              onClick={increase}
              className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
            >
              <QuantityPlusIcon />
            </div>
          </div>

          <div className="text-[16px] text-black font-bold ml-4">
            {totalPrice}₮
          </div>
        </div>
      </div>
    </div>
  );
}
