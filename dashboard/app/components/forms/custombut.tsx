"use client";

import { Loader } from "lucide-react";

interface ButtonType {
  isLoading?: boolean;
  callback: () => void;
  icon?: string;
  title: string;
  style?: string;
}

const CustomButton = ({
  isLoading,
  callback,
  icon,
  title,
  style,
}: ButtonType) => {
  return (
    <button
      disabled={isLoading}
      onClick={callback}
      className={`bg-blue-500 text-white font-[400] text-sm px-[15px] py-[5px] rounded-md flex items-center ${style}`}
    >
      {isLoading ? (
        <Loader className="animate-spin mr-[10px] w-[20px] h-[20px]" />
      ) : (
        <span className="material-icons mr-2 text-[10px]">{icon}</span>
      )}
      {title}
    </button>
  );
};

export default CustomButton;
