"use client";

import ChevronLeft from "@/app/admin/_icons/ChevronLeft";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
  title = "Login",
  subtitle = "Log in to enjoy your favorite dishes.",
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-12 bg-white p-6">
      <div className="flex flex-col gap-6 w-[416px]">
        <div
          className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {children}
      </div>

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
