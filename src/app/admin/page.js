"use client";

import { useState } from "react";
import HeaderIcon from "./_icons/HeaderIcon";
import FoodMenuAdmin from "./_icons/MenuIcon";
import TruckIcon from "./_icons/TruckIcon";
import AvatarIcon from "./_icons/AvatarIcon";
import DishesCategoryAdmin from "./DishesCategory";
import CategoryWithItems from "./_features/CategoryWithItems";
import { useOrders } from "../_provider/ordersProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { BACK_END_URL } from "../_constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsUpDown } from "lucide-react";
import OrderInfo from "./_components/OrderInfoFoodCard";

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("food");
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const {
    selectedOrders,
    getOrders,
    setSelectedOrders,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    setSortType,
  } = useOrders();

  console.log("selectedOrders", selectedOrders);

  const updateOrdersStatus = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          axios.put(`${BACK_END_URL}/orders/${orderId}/status`, {
            status: selectedStatus,
            foodIds: [],
          })
        )
      );

      getOrders();
      setSelectedOrders([]);
      setOpen(false);
      toast.success("Songoson orderuudiin status shineclegdlee");
    } catch (error) {
      console.log("error", error);
      toast.error("Aldaa garlaa");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F4F5]">
      <div className="flex flex-col w-[220px] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <HeaderIcon />
          <div>
            <div className="text-[20px] text-black font-bold leading-tight">
              NomNom
            </div>
            <div className="text-[12px] text-[#71717A]">Swift delivery</div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div
            onClick={() => setActiveMenu("food")}
            className={`flex items-center gap-3 w-full h-11 px-4 rounded-xl cursor-pointer transition-all duration-200
              ${
                activeMenu === "food"
                  ? "bg-[#F4F4F5] font-semibold text-black"
                  : "text-[#71717A] hover:bg-[#F9F9FA] hover:text-black"
              }`}
          >
            <FoodMenuAdmin
              className={`transition ${
                activeMenu === "food" ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="text-[15px]">Food menu</span>
          </div>

          <div
            onClick={() => setActiveMenu("orders")}
            className={`flex items-center gap-3 w-full h-11 px-4 rounded-xl cursor-pointer transition-all duration-200
              ${
                activeMenu === "orders"
                  ? "bg-[#F4F4F5] font-semibold text-black"
                  : "text-[#71717A] hover:bg-[#F9F9FA] hover:text-black"
              }`}
          >
            <TruckIcon
              className={`transition ${
                activeMenu === "orders" ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="text-[15px]">Orders</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[#E4E4E7] flex items-center gap-3">
          <AvatarIcon />
          <span className="text-[14px] text-[#52525B] font-medium">Admin</span>
        </div>
      </div>

      <div className="flex-1 px-10 py-6">
        {activeMenu === "food" && (
          <div className="flex flex-col w-full gap-6">
            <div className="w-9 h-9">
              <AvatarIcon />
            </div>
            <div className="flex flex-row bg-[#FFF] justify-between w-full p-4 items-center border-t border-[#E4E4E7] rounded-lg shadow-sm">
              <DishesCategoryAdmin />
            </div>
            <div>
              <CategoryWithItems />
            </div>
          </div>
        )}

        {activeMenu === "orders" && (
          <div className="flex flex-col w-full gap-6 flex-wrap">
            <div className="flex justify-end">
              <div className="w-9 h-9">
                <AvatarIcon />
              </div>
            </div>

            <div className="flex flex-col bg-[#FFF] justify-between w-full p-4 items-center border-t border-[#E4E4E7] rounded-lg shadow-sm">
              <div className="flex flex-row justify-between w-full items-center">
                <div className="flex flex-col">
                  <div className="font-bold text-[20px]">Orders</div>
                  <div className="text-[12px] text-[#71717A]">
                    Track and manage customer orders
                  </div>
                </div>
                <div className="flex flex-row w-[525px] gap-3">
                  <div className="w-[300px] h-9 items-center justify-center flex border border-[#E4E4E7] rounded-full">
                    Calendar
                  </div>
                  <div
                    onClick={() => selectedOrders.length > 0 && setOpen(true)}
                    className={`w-[179px] h-9 flex items-center justify-center border-[#E4E4E7] rounded-full border px-4 py-2 text-[14px] ${
                      selectedOrders.length > 0
                        ? "cursor-pointer hover:bg-gray-50"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    Change delivery state
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="w-full mt-6">
                <div className="relative">
                  <div className="flex flex-row w-full h-[56px] items-center border-b justify-between border">
                    <div className="p-4">
                      <input
                        type="checkbox"
                        checked={
                          selectedOrders.length === currentItems.length &&
                          currentItems.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders(
                              currentItems.map((order) => order._id)
                            );
                          } else {
                            setSelectedOrders([]);
                          }
                        }}
                      />
                    </div>

                    <div className="P-4">№</div>

                    <div className="min-w-[213px] p-4">Customer email</div>

                    <div className="w-[160px] p-4">Food</div>

                    <div
                      onClick={() =>
                        setSortType((prev) =>
                          prev === "date-asc" ? "date-desc" : "date-asc"
                        )
                      }
                      className="w-[160px] p-4 flex items-center gap-2 cursor-pointer"
                    >
                      Date <ChevronsUpDown />
                    </div>

                    <div className="w-[160px] p-4">Total</div>

                    <div className="w-[213px] p-4">Delivery address</div>

                    <div
                      onClick={() =>
                        setSortType((prev) =>
                          prev === "status-asc" ? "status-desc" : "status-asc"
                        )
                      }
                      className="min-w-[160px] p-4 flex items-center gap-2 cursor-pointer justify-between"
                    >
                      Delivery state <ChevronsUpDown />
                    </div>
                  </div>

                  {currentItems.map((order, index) => (
                    <OrderInfo
                      key={order._id}
                      {...order}
                      index={index + 1}
                      isSelected={selectedOrders.includes(order._id)}
                      onSelect={(orderId) => {
                        if (selectedOrders.includes(orderId)) {
                          setSelectedOrders(
                            selectedOrders.filter((id) => id !== orderId)
                          );
                        } else {
                          setSelectedOrders([...selectedOrders, orderId]);
                        }
                      }}
                    />
                  ))}

                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={currentPage === i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((p) => Math.min(p + 1, totalPages))
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-[364px] min-h-9 p-6 flex flex-col gap-6">
            <div className="flex flex-row gap-[10px] items-center justify-between">
              <div className="font-bold">Change delivery state</div>
              <div
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F4F4F5] cursor-pointer"
              >
                X
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              {["delivered", "pending", "cancelled"].map((status) => (
                <div
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`text-[12px] py-2 px-[10px] rounded-full w-full flex justify-center items-center cursor-pointer
        ${selectedStatus === status ? "bg-black text-white" : "bg-[#F4F4F5]"}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              ))}
            </div>

            <div
              onClick={selectedStatus ? updateOrdersStatus : null}
              className={`w-full rounded-full flex justify-center items-center h-9 text-white cursor-pointer
    ${selectedStatus ? "bg-black" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Save
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
