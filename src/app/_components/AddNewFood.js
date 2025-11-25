"use client";

import { useState } from "react";
import PlusIcon from "../_icons/plusIcon";

export default function AddNewFoodCard() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:1000/food", {
        foodName: foodName,
        foodPrice: foodPrice,
        foodIngredients: foodIngredients,
        foodImage: foodImage,
        category: category,
      });
      setOpen(false);
      setCategoryName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[270.75px] h-[241px] border rounded-xl border-red-500 flex flex-col justify-center items-center gap-6">
      <div
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center"
      >
        <PlusIcon />
      </div>
      <div className="text-[14px] max-w-[154px] text-center">
        Add new Dish to Appetizers
      </div>
      {open && (
        <div className=" fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[472px] h-[596px] flex flex-col gap-6 relative justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Add new Dish to Appetizers
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-[14px]">Food name</div>
                <input
                  placeholder="Type food name"
                  type="text"
                  className="border p-2 rounded-md h-[38px]"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[14px]">Food price</div>
                <input
                  placeholder="Enter price"
                  type="text"
                  className="border p-2 rounded-md h-[38px]"
                ></input>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Ingredients</div>
              <input
                className="border p-2 rounded-md h-[90px] w-full"
                placeholder="List ingredients..."
                type="text"
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[14px] font">Food image</div>
              <input
                type="text"
                placeholder="Choose a file or drag & drop it here"
                className="border p-2 rounded-md w-full h-[138px] bg-gray-100 "
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-black text-white"
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
