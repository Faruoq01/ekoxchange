"use client";

const Banner = () => {
  return (
    <div className="hidden md:flex w-1/2 gradient-bg p-12 text-white flex-col justify-between relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-white/10 rounded-full"></div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-full">
            <span className="material-icons text-white">currency_bitcoin</span>
          </div>
          <span className="text-2xl font-bold">Eko Xchange</span>
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
