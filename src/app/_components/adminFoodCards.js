import EditIcon from "../_icons/EditIcon";

export default function AdminFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
}) {
  return (
    <div className=" p-4 w-[270.75px] h-[241px] border border-[#E4E4E7] rounded-[20px] gap-5 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
        className="h-[129px] w-full bg-black rounded-xl flex justify-end items-end p-5 bg-cover"
      >
        <div className="w-11 h-11 flex items-center justify-center bg-white rounded-full">
          <EditIcon />
        </div>
      </div>
      <div className="h-[60px] w-full bg-white flex flex-col gap-2”">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[14px] color-red-500  text-red-500">
            {foodName}
          </div>
          <div className="text-[12px] font-bold">{foodPrice}₮</div>
        </div>
        <div className="w-full h-[32px] text-[12px]">{foodIngredients}</div>
      </div>
    </div>
  );
}
