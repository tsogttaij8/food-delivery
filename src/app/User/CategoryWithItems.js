// CategoryWithItems.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import UserFoodCard from "./_components/UserFoodCard";

export default function CategoryWithItemsUser() {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);
  // console.log(categoryData);
  return (
    <div className="flex flex-col gap-9 bg-[#404040] w-[1264px] justify-center mt-12 mb-12">
      {categoryData.map((item, index) => (
        <div
          key={item._id || index}
          className="w-full min-h-[325px] p-5 bg-[#404040] flex flex-col gap-[54px] rounded-xl"
        >
          <div className="text-[30px] text-white font-medium">
            {item.categoryName}
          </div>

          {/* 1 мөрөнд яг 3 card */}
          <div className="grid grid-cols-3 gap-9">
            {item.foods.map((food) => (
              <UserFoodCard key={food._id} {...food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
