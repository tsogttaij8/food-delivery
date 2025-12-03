"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginLayout from "./LoginLayout";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:1000/authentication/login", values);

      router.push("/auth/user");
      console.log("LOGIN FORM DATA:", values);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ errors, values, setFieldValue }) => (
        <Form>
          <LoginLayout>
            <Field>
              <Input
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
            </Field>

            <Field>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
            </Field>

            {(errors.email || errors.password) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email || errors.password}
              </p>
            )}

            <div className="flex justify-between items-center text-sm mt-1">
              <button
                className="text-blue-600 hover:underline"
                type="button"
                onClick={() => router.push("/login/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <Button
              className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors mt-2"
              type="submit"
            >
              Login
            </Button>

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
          </LoginLayout>
        </Form>
      )}
    </Formik>
  );
}
