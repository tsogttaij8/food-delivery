// CategoryWithItems.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import AddNewFoodCard from "./AddNewFood";
import AdminFoodCard from "./adminFoodCards";

export default function CategoryWithItems() {
  const [categoryData, setCategoryData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/category");
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full min-w-[1123px]">
      {categoryData.map((item, index) => (
        <div
          key={item._id || index}
          className="w-full min-h-[325px] p-5 border border-[#E4E4E7] flex flex-col gap-4 bg-white rounded-xl"
        >
          <div className="text-[20px] font-medium">{item.categoryName}</div>
          <div className="flex flex-row gap-5">
            <AddNewFoodCard categoryId={item._id} />
            {item.foods.map((food) => (
              <AdminFoodCard key={food._id} {...food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
