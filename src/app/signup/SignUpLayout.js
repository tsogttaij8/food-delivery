"use client";

import Image from "next/image";
import ChevronLeft from "../_icons/ChevronLeft";
import { useRouter } from "next/navigation";

export default function SignUpLayout({
  children,
  title = "Create your account",
  subtitle = "Sign up to explore your favorite dishes.",
}) {
  const router = useRouter();

  const navigateLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-12 bg-white p-6">
      <div className="flex flex-col gap-6 w-[416px]">
        <div
          className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </div>
        helo
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {children}
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 font-medium hover:underline cursor-pointer"
            onClick={navigateLoginPage}
          >
            Log in
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <Image
          src="/SignUpPoster.png"
          alt="Sign Up Poster"
          width={856}
          height={904}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
