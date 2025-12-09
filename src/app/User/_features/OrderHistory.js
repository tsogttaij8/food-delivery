import OrderHistoryCard from "../_components/OrderHistoryCard";

export default function OrderHistory() {
  return (
    <div>
      <div className="text-white h-full bg-white rounded-[20px] flex flex-col gap-5">
        <div className="text-black text-[20px] font-bold">Order history</div>
        <div className="flex flex-col gap-5 overflow-y-auto">
          <OrderHistoryCard />
          <OrderHistoryCard />
          <OrderHistoryCard />
          <OrderHistoryCard />
          <OrderHistoryCard />
          <OrderHistoryCard />
        </div>
      </div>{" "}
    </div>
  );
}
