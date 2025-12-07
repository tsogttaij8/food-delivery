"use client";

import { useState, useEffect } from "react";
import CartIcon from "@/app/admin/_icons/ShoppingCart";
import CartFoodCard from "../_components/CartFoodCard";
import axios from "axios";
import toast from "react-hot-toast";
import HandingDishIconRed from "../_icons/handinDishIconRed";

export default function CartItems() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const increase = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  const decrease = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated.map((i) => ({ _id: i._id, quantity: i.quantity })))
    );
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (!token) return alert("Ta newterj orno uu");

    if (!cartItems || cartItems.length === 0) return alert("Cart empty!!!");

    const itemsTotalAmount = cartItems.reduce(
      (sum, i) => sum + i.foodPrice * i.quantity,
      0
    );
    const deliveryPrice = itemsTotalAmount < 50000 ? 15000 : 7500;
    const totalPrice = itemsTotalAmount + deliveryPrice;

    try {
      const res = await axios.post(
        "http://localhost:1000/order",
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
      console.log("Order created:", res.data);
      localStorage.removeItem("cart");
      setCartItems([]);
      setDeliveryPrice(0);
      toast.success("Order Successfully created!");
      setOpen(false);
      //
    } catch (err) {
      console.error(
        "Order error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      const ids = stored.map((i) => i._id);

      if (ids.length === 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDeliveryPrice(0);
        setCartItems([]);
        return;
      }

      fetch("http://localhost:1000/food/get-by-ids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
        .then((res) => res.json())
        .then((data) => {
          const withQuantity = data.map((food) => {
            const cartItem = stored.find((i) => i._id === food._id);
            return { ...food, quantity: cartItem.quantity };
          });
          setCartItems(withQuantity);
        });
    }
  }, [open]);

  useEffect(() => {
    const saved = localStorage.getItem("deliveryLocation");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setDeliveryLocation(saved);
  }, [open]);

  useEffect(() => {
    if (cartItems.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeliveryPrice(0);
      return;
    }
    const totalPrice = cartItems.reduce(
      (sum, food) => sum + food.foodPrice * food.quantity,
      0
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeliveryPrice(totalPrice < 50000 ? 15000 : 7500);
  }, [cartItems]);

  // console.log("cartItems", cartItems);

  const itemsTotalAmount = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.foodPrice * currentValue.quantity;
  }, 0);
  // console.log("totalAmount", totalAmount);
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
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-center">
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
            <div className="w-full bg-white rounded-full h-11 p-1 gap-2 flex flex-row">
              <div
                onClick={() => setActiveTab("cart")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "cart" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Cart
              </div>

              <div
                onClick={() => setActiveTab("order")}
                className={`text-[18px] flex-1 flex items-center justify-center rounded-full cursor-pointer ${
                  activeTab === "order" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                Order
              </div>
            </div>

            <div className="flex flex-col overflow-y-auto bg-white rounded-xl">
              <div className="flex-1 overflow-y-auto text-white h-full ">
                {activeTab === "cart" && (
                  <>
                    <div className="text-[20px] text-[#71717A)]">My Cart</div>
                    {cartItems.length === 0 ? (
                      <div className="bg-white p-4 rounded-[20px] min-h-40 flex items-center justify-center flex-col gap-1">
                        {/* <p className="text-[#71717A]">No items in cart</p> */}
                        <div>
                          <HandingDishIconRed />
                        </div>
                        <div className="text-black text-[16px] font-bold">
                          Your cart is empty
                        </div>
                        <div className="text-[#71717A] text-center w-[400px]">
                          Hungry? 🍔 Add some delicious dishes to your cart and
                          satisfy your cravings!
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-4 rounded-[20px]">
                        <div className="flex flex-col gap-5">
                          <div className="text-[20px] text-[#71717A] font-bold">
                            My cart
                          </div>
                          {cartItems.map((item) => (
                            <CartFoodCard
                              key={item._id}
                              item={item}
                              increase={() => increase(item._id)}
                              decrease={() => decrease(item._id)}
                              remove={() => removeFromCart(item._id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {activeTab === "cart" && (
                <div className="bg-white rounded-md w-full p-4 flex-flex-col gap-2">
                  <div className="text-[20px] text-[#71717A] font-bold">
                    Delivery location
                  </div>
                  <input
                    value={deliveryLocation}
                    onChange={(e) => {
                      setDeliveryLocation(e.target.value);
                      localStorage.setItem("deliveryLocation", e.target.value);
                    }}
                    className="min-h-20 w-full border rounded-20px"
                  ></input>
                </div>
              )}
            </div>

            {activeTab === "cart" && (
              <div className="h-[276px] w-full bg-white rounded-[20px] p-4 flex flex-col gap-5 font-bold">
                <div className="text-[#71717A] text-[20px]">Payment info</div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between w-full h-[28px]">
                    <div className="text-[#71717A]">Items</div>
                    <div className="text-black font-bold">
                      {itemsTotalAmount}₮
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full h-[28px]">
                    <div className="text-[#71717A]">Shipping</div>
                    <div className="text-black font-bold">{deliveryPrice}₮</div>
                  </div>
                </div>
                <div
                  className="h-px w-full"
                  style={{ backgroundImage: "url('/line.png')" }}
                ></div>

                <div className="flex flex-row justify-between w-full h-[28px]">
                  <div className="text-[#71717A]">Total</div>
                  <div className="text-black font-bold">{totalAmount}₮</div>
                </div>
                <div
                  onClick={handleOrder}
                  className="cursor-pointer w-full h-11 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  Checkout
                </div>
              </div>
            )}

            {activeTab === "order" && (
              <div className="p-4 text-white">
                <p>Order information will be shown here...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
