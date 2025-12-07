"use client";

import { ChevronDown, ChevronsUpDown } from "lucide-react";

export default function OrderInfo() {
  return (
    <div className="flex flex-row bg-white w-full h-[56px] border  ">
      <div className="w-[48px] flex justify-center items-center">
        <input type="checkbox"></input>
      </div>
      <div className="w-[56px] h-[56px] p-4">1</div>
      <div className="min-w-[213.5px] p-4">Amgalan</div>
      <div className="w-[160px] p-4 flex justify-between">
        2 foods <ChevronDown />
      </div>
      <div className="w-[160px] p-4">2024/12/20</div>
      <div className="p-4 w-[160px]">26.97$</div>
      <div className="w-[213.5px] overflow-y-auto ">
        2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100
        айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД нэгдсэн
        эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д
        ногоон20
      </div>
      <div className="w-[160px] flex items-center p-4">
        <div className="h-[32px] [w-94px] flex items-center gap-[10px] border rounded-full px-[10px]">
          Pending
          <ChevronsUpDown />
        </div>
      </div>
    </div>
  );
}
