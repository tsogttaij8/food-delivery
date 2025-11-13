"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpLayout from "./SignUpLayout";
import Mail from "@/app/_components/mail";
import PasswordTwo from "@/app/_components/password";

export default function CombinedSignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNext = () => {
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    //
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");
    setStep(2);
  };

  const handleFinish = () => {
    if (!password) {
      setPasswordError("Please enter your password");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    router.push("/login");
  };

  return (
    <div>
      {step === 1 && (
        <SignUpLayout
          title="Create your account"
          subtitle="Sign up to explore your favorite dishes."
        >
          <div>
            <Mail value={email} onChange={setEmail} />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <button
            onClick={handleNext}
            className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors mt-2"
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
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          <button
            onClick={handleFinish}
            className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors mt-2"
          >
            Finish
          </button>
        </SignUpLayout>
      )}
    </div>
  );
}
