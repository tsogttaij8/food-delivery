import { useEffect, useState } from "react";
import EditIcon from "../_icons/EditIcon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TrashIcon from "../_icons/trashIcon";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InstagramIcon from "../_icons/InstagramIcon";

export default function AdminFoodCard({
  foodName,
  foodPrice,
  foodIngredients,
  foodImage,
  category,
  _id,
}) {
  const [open, setOpen] = useState(false);
  const [foodId, setFoodId] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const id = _id;
  const foodSchema = Yup.object().shape({
    foodName: Yup.string().required("Food Name Required!"),
    foodPrice: Yup.string().required("Food Price Required!"),
    foodIngredients: Yup.string().required("Ingredients is Required!"),
    foodImage: Yup.mixed().required("Food Image is required"),
    category: Yup.mixed().required("Category is required"),
  });

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:1000/food/${id}`);
      console.log("Food deleted successfully:", res.data);
    } catch (err) {
      console.log("error deleting food:", err);
    }
  };

  const handleSubmit = async (values) => {
    // console.log(_id);
    try {
      // const formData = {
      //   foodName: values.foodName,
      //   foodPrice: values.foodPrice,
      //   foodIngredients: values.foodIngredients,
      //   id: id,
      //   foodImage: values.foodImage,
      // };
      const formData = new FormData();
      formData.append("foodName", values.foodName);
      formData.append("foodPrice", values.foodPrice);
      formData.append("foodIngredients", values.foodIngredients);
      formData.append("foodImage", values.foodImage);
      formData.append("id", id);
      // console.log(formData);
      const res = await axios.put("http://localhost:1000/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Food created:", res.data);
      setOpen(false);
    } catch (err) {
      console.log("Error |updating food:", err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:1000/category");
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(categoryData);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
  }, []);
  return (
    <div className=" p-4 w-[270.75px] h-[241px] border border-[#E4E4E7] rounded-[20px] gap-5 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
        className="h-[129px] w-full bg-black rounded-xl flex justify-end items-end p-5 bg-cover"
      >
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="w-11 h-11 flex items-center justify-center bg-white rounded-full"
        >
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
      {/*  */}
      {/* OPEN */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <Formik
            initialValues={{
              foodName: foodName,
              foodPrice: foodPrice,
              category: category,
              foodIngredients: foodIngredients,
              foodImage: foodImage,
            }}
            validationSchema={foodSchema}
            onSubmit={handleSubmit}
            className=" fixed inset-0 bg-black/40 flex justify-center items-center"
          >
            {({ setFieldValue }) => (
              <Form className="bg-white p-6 rounded-xl shadow-xl w-[472px] flex flex-col gap-6 relative justify-between">
                <div className="flex justify-between py-2 items-center">
                  <h2 className="text-xl font-semibold">Add new Dish to</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="text-[14px]">Dish name</div>
                  <div className="flex flex-col">
                    <Field
                      name="foodName"
                      placeholder="Type food name"
                      className="border rounded-md h-[38px] p-2 w-[288px]"
                    />
                    <ErrorMessage
                      name="foodName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="text-[14px]">Dish category</div>
                  {/* <Select>
                    <SelectTrigger className="w-[288px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        {categoryData.categoryName.map((category) => (
                          <SelectItem key={category._id} />
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                  <Select value={category}>
                    <SelectTrigger className="w-[288px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>

                        {categoryData.map((category) => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                            onClick={() =>
                              setFieldValue("category", category._id)
                            }
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="text-[14px]">Food price</div>
                  <div className="flex flex-col">
                    <Field
                      name="foodPrice"
                      placeholder="Enter price"
                      className="border rounded-md h-[38px] p-2 w-[288px]"
                    />
                    <ErrorMessage
                      name="foodPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div>Ingredients</div>

                  <div className="flex flex-col">
                    <Field
                      name="foodIngredients"
                      placeholder="List ingredients..."
                      className="border rounded-md h-[38px] p-2 w-[288px]"
                    />
                    <ErrorMessage
                      name="foodIngredients"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="text-[14px] font">Food image</div>
                  <div>
                    <input
                      type="file"
                      name="foodImage"
                      onChange={(e) =>
                        setFieldValue("foodImage", e.target.files[0])
                      }
                      className="border p-2 rounded-md w-[288px] h-[138px] bg-gray-100"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between gap-3 w-full h-[64px] items-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    className="w-[48px] h-[40px] border border-red-500 rounded-md flex justify-center items-center "
                  >
                    <TrashIcon />
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-black text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {/* OPEN */}
    </div>
  );
}
