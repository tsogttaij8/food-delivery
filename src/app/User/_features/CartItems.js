"use client";

import { useState, useEffect } from "react";
import CartIcon from "@/app/admin/_icons/ShoppingCart";
import CartFoodCard from "../_components/CartFoodCard";
import axios from "axios";
import HandingDishIconRed from "../_icons/handinDishIconRed";
import { toast } from "react-toastify";
import OrderHistory from "./OrderHistory";

const getDeliveryPrice = (amount) => (amount < 50000 ? 15000 : 7500);

const updateLocal = (items) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(items.map((i) => ({ _id: i._id, quantity: i.quantity })))
  );
};

export default function CartItems() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const updateQuantity = (id, change) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updated);
    updateLocal(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    updateLocal(updated);
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Ta newterj orno uu");
    if (cartItems.length === 0) return alert("Cart empty!!!");

    const itemsTotal = cartItems.reduce(
      (sum, i) => sum + i.foodPrice * i.quantity,
      0
    );

    const totalPrice = itemsTotal + getDeliveryPrice(itemsTotal);

    try {
      await axios.post(
        "http://localhost:1000/orders",
        {
          FoodOrderItems: cartItems.map((i) => ({
            food: i._id,
            quantity: i.quantity,
          })),
          totalPrice,
          deliveryLocation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("cart");
      setCartItems([]);
      setDeliveryPrice(0);
      toast.success("Order Successfully created!");
      setOpen(false);
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
    }
  };

  // Load cart + deliveryLocation when sidebar opens
  useEffect(() => {
    if (!open) return;

    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const savedLocation = localStorage.getItem("deliveryLocation");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedLocation) setDeliveryLocation(savedLocation);

    if (stored.length === 0) {
      setCartItems([]);
      setDeliveryPrice(0);
      return;
    }

    fetch("http://localhost:1000/food/get-by-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: stored.map((i) => i._id) }),
    })
      .then((res) => res.json())
      .then((data) => {
        const withQuantity = data.map((food) => {
          const found = stored.find((i) => i._id === food._id);
          return { ...food, quantity: found.quantity };
        });
        setCartItems(withQuantity);
      });
  }, [open]);

  // Calculate delivery price when cart changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cartItems.length === 0) return setDeliveryPrice(0);

    const itemsTotal = cartItems.reduce(
      (sum, food) => sum + food.foodPrice * food.quantity,
      0
    );

    setDeliveryPrice(getDeliveryPrice(itemsTotal));
  }, [cartItems]);

  // Totals
  const itemsTotalAmount = cartItems.reduce(
    (acc, cur) => acc + cur.foodPrice * cur.quantity,
    0
  );
  const totalAmount = itemsTotalAmount + deliveryPrice;

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer w-9 h-9 flex items-center justify-center bg-white rounded-full"
      >
        <CartIcon />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="h-screen w-[600px] bg-neutral-700 p-8 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <CartIcon />
                <div className="text-[20px] text-white font-bold">
                  Order detail
                </div>
              </div>
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer text-white text-2xl"
              >
                ×
              </div>
            </div>

            <div className="w-full bg-white rounded-full h-11 p-1 gap-2 flex">
              <div
                onClick={() => setActiveTab("cart")}
                className={`flex-1 text-[18px] flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "cart" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Cart
              </div>

              <div
                onClick={() => setActiveTab("order")}
                className={`flex-1 text-[18px] flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "order" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Order
              </div>
            </div>

            {activeTab === "cart" && (
              <div className="flex flex-1 flex-col h-full w-full gap-4">
                {/* ==== CART ITEMS ==== */}
                <div className="flex flex-col overflow-y-auto bg-white rounded-xl p-4 gap-5 ">
                  {/* ==== MY CART TITLE ==== */}
                  <div className="text-[24px] font-bold text-[#71717A]">
                    My Cart
                  </div>

                  <div className="flex-1 overflow-y-auto text-white h-full ">
                    {cartItems.length === 0 ? (
                      <div className="bg-white rounded-[20px] min-h-40 flex items-center justify-center flex-col gap-1">
                        <HandingDishIconRed />
                        <div className="text-black text-[16px] font-bold">
                          Your cart is empty
                        </div>
                        <div className="text-[#71717A] text-center w-[400px]">
                          Hungry? 🍔 Add some delicious dishes to your cart!
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-[20px]">
                        <div className="flex flex-col gap-5 h-[200px]">
                          {cartItems.map((item) => (
                            <CartFoodCard
                              key={item._id}
                              item={item}
                              increase={() => updateQuantity(item._id, 1)}
                              decrease={() => updateQuantity(item._id, -1)}
                              remove={() => removeItem(item._id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delivery location */}
                  <div className="bg-white rounded-md w-full flex-flex-col gap-2">
                    <div className="text-[20px] text-[#71717A] font-bold">
                      Delivery location
                    </div>
                    <input
                      value={deliveryLocation}
                      onChange={(e) => {
                        setDeliveryLocation(e.target.value);
                        localStorage.setItem(
                          "deliveryLocation",
                          e.target.value
                        );
                      }}
                      className="min-h-20 w-full border rounded-20px"
                    />
                  </div>
                </div>

                {/* ==== PAYMENT INFO ==== */}
                <div className="w-full bg-white rounded-[20px] p-4 flex flex-col gap-5 font-bold">
                  <div className="text-[#71717A] text-[20px]">Payment info</div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="text-[#71717A]">Items</div>
                      <div className="text-black">{itemsTotalAmount}₮</div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-[#71717A]">Shipping</div>
                      <div className="text-black">{deliveryPrice}₮</div>
                    </div>
                  </div>

                  <div
                    className="h-px w-full"
                    style={{ backgroundImage: "url('/line.png')" }}
                  ></div>

                  <div className="flex justify-between">
                    <div className="text-[#71717A]">Total</div>
                    <div className="text-black">{totalAmount}₮</div>
                  </div>

                  <div
                    onClick={handleOrder}
                    className="cursor-pointer w-full h-11 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    Checkout
                  </div>
                </div>
              </div>
            )}

            {activeTab === "order" && (
              <div className="p-4 text-white h-full bg-white rounded-[20px] flex flex-col gap-5 overflow-y-auto">
                <OrderHistory />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
