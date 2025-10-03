"use client";
import { AppImages } from "@/app/assets/appimages";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="hidden md:flex w-1/2 gradient-bg p-12 text-white flex-col justify-between relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-white/10 rounded-full"></div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-[150px] h-[60px]">
            <Image fill src={AppImages.logo} alt="icon" />
          </div>
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          Welcome to the Future of Crypto Trading.
        </h1>
        <p className="text-white/80">
          Securely buy, trade, and hold cryptocurrencies.
        </p>
      </div>
      <div className="text-sm text-white/60">
        © 2023 Eko Xchange. All rights reserved.
      </div>
    </div>
  );
};

export default Banner;
