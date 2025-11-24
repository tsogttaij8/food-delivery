"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PlusIcon from "../_icons/plusIcon";

export default function DishesCategoryAdmin() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [categoryData, setCategoryData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/category/get-categories"
      );
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;

    try {
      await axios.post("http://localhost:1000/category/add-category", {
        categoryName: categoryName,
      });
      setOpen(false);
      setCategoryName("");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(categoryData);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-bold text-[20px]">Dishes Category</div>

      <div className="flex flex-wrap gap-3 w-[1123px]">
        {categoryData.map((item, index) => (
          <div
            key={item._id || index}
            className="p-2 border rounded-full bg-white border-[#E4E4E7] py-2 px-4 h-9 flex justify-center items-center"
          >
            {item.categoryName}
          </div>
        ))}

        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-2xl bg-red-500"
        >
          <PlusIcon />
        </button>
      </div>

      {open && (
        <div className=" fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[460px] h-[272px] flex flex-col gap-6 relative justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add new category</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[14px] font">Category name</div>
              <input
                type="text"
                placeholder="type category name..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-black text-white"
              >
                Add category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
