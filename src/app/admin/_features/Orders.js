"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import OrderInfo from "../_components/OrderInfo";

export default function Orders() {
  const [ordersData, setordersData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/orders");
      setordersData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("ordersData", ordersData);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);
  return (
    <div>
      <OrderInfo />
    </div>
  );
}
