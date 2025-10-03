"use client";
import Banner from "./components/login/banner";
import LoginForm from "./components/login/form";

export default function Home() {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <div className="w-full h-full flex overflow-hidden">
        <Banner />
        <LoginForm />
      </div>
    </div>
  );
}
