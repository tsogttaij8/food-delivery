"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Имэйл хаяг буруу байна")
      .required("Имэйл шаардлагатай"),
    password: Yup.string().required("Нууц үг шаардлагатай"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/authentication/login",
        values
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Амжилттай нэвтэрлээ!");
      router.push("/");
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data) {
        toast.error(err.response.data);
      } else {
        toast.error("Нэвтрэлт амжилтгүй боллоо");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-12 bg-white p-6">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className="flex flex-col gap-6 w-[416px]">
            {/* Back Button */}
            <div
              className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-black">Login</h1>
              <p className="text-sm text-gray-500">
                Log in to enjoy your favorite dishes.
              </p>
            </div>

            {/* Email */}
            <Field>
              <Input
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
            </Field>

            {/* Password */}
            <Field>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
            </Field>

            {/* Validation Errors */}
            {(errors.email || errors.password) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email || errors.password}
              </p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-between items-center text-sm mt-1">
              <button
                className="text-blue-600 hover:underline"
                type="button"
                onClick={() => router.push("/login/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors mt-2"
              type="submit"
            >
              Login
            </Button>

            {/* Sign up */}
            <div className="text-sm text-gray-600 mt-4 text-center">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                type="button"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Right Side Poster */}
      <div className="hidden md:block">
        <Image
          src="/SignUpPoster.png"
          alt="Login Poster"
          width={856}
          height={904}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
