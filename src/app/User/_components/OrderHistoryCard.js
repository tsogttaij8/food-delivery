export default function OrderHistoryCard() {
  return (
    <div className="px-3 flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div className="text-black text-[16px]">26.97$</div>
          <div className="text-black text-[16px]">#3213</div>
        </div>
        <div className="rounded-full border border-red-500 text-black px-[10px] py-1">
          Pending
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <div className="text-[#71717A]">Sunshine Stackers </div>
          <div className="text-black">x 1</div>
        </div>
        <div className="flex justify-between">
          <div className="text-[#71717A]">Sunshine Stackers </div>
          <div className="text-black">x 1</div>
        </div>
      </div>
      <div className="text-[#71717A]">2024/12/20</div>
      <div className="min-h-[16px] w-full text-[#71717A] overflow-auto">
        2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100
        айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн
        эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д
        ногоон20
      </div>
      <div
        className="h-px w-full mt-5"
        style={{ backgroundImage: "url('/line.png')" }}
      ></div>
    </div>
  );
}
