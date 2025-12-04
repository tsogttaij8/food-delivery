"use client";

import { FoodCategoryProvider } from "../_provider/foodCategory";

export default function AdminLayout({ children }) {
  return <FoodCategoryProvider>{children}</FoodCategoryProvider>;
}
