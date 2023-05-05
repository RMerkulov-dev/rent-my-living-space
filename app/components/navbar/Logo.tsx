"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-2">
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="50"
        width="50"
        src="/images/main_logo.png"
        priority
      />
      <p className="font-bold text-rose-500 hidden  lg:block">HOUSING.COM</p>
    </div>
  );
};

export default Logo;
