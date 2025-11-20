"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SignUpLayout from "./SignUpLayout";
import Mail from "@/app/_components/mail";
import PasswordTwo from "@/app/_components/password";
import axios from "axios";

export default function CombinedSignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .when("$step", {
        is: 2,
        then: (schema) => schema.required("Password is required"),
      }),

    confirmPassword: Yup.string().when("$step", {
      is: 2,
      then: (schema) =>
        schema
          .oneOf([Yup.ref("password"), null], "Passwords do not match")
          .required("Confirm your password"),
    }),
  });

  const handleSubmit = async (values) => {
    if (step === 1) {
      setStep(2);
      return;
    }
    await axios
      .post("http://localhost:1000/authentication/sign-up", values)
      .catch((error) => {
        console.log(error);
      });

    console.log("FINAL FORM DATA:", values);

    router.push("/login");
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
      context={{ step }}
    >
      {({ errors, values, setFieldValue }) => (
        <Form>
          {step === 1 && (
            <SignUpLayout
              title="Create your account"
              subtitle="Sign up to explore your favorite dishes."
            >
              <Mail
                value={values.email}
                onChange={(v) => setFieldValue("email", v)}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}

              <button
                type="submit"
                className="w-full h-10 bg-black text-white rounded-md mt-2"
              >
                Next
              </button>
            </SignUpLayout>
          )}

          {step === 2 && (
            <SignUpLayout
              title="Create a strong password"
              subtitle="Create a strong password with letters, numbers."
            >
              <PasswordTwo
                password={values.password}
                confirmPassword={values.confirmPassword}
                setPassword={(v) => setFieldValue("password", v)}
                setConfirmPassword={(v) => setFieldValue("confirmPassword", v)}
              />

              {(errors.password || errors.confirmPassword) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password || errors.confirmPassword}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-10 bg-black text-white rounded-md mt-2"
              >
                Finish
              </button>
            </SignUpLayout>
          )}
        </Form>
      )}
    </Formik>
  );
}
