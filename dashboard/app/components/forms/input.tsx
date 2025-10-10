import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CurrencyInputProps {
  label: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  formErrors: any;
  type: string;
  isFiat?: boolean;
  isPercent?: boolean;
}

const InputText: React.FC<CurrencyInputProps> = ({
  label,
  name,
  placeholder = "Enter text",
  register,
  formErrors,
  type,
  isFiat,
  isPercent,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="font-semibold text-[12px] text-black text-left"
      >
        {label}
      </label>
      <div className="flex flex-row items-center px-[15px] py-[8px] rounded-md border shadow-sm">
        {isFiat && <span className="text-gray-500 text-sm mr-[10px]">₦</span>}
        {isPercent && (
          <span className="text-gray-500 text-sm mr-[10px]">%</span>
        )}
        <input
          type={type}
          id={name}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          style={{ padding: "0px" }}
          className="w-full text-[12px] px-[0px] placeholder:text-gray-500 outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent"
        />
      </div>
      {formErrors[name] && (
        <p className="text-red-600 mb-[10px] text-[10px]">
          {formErrors[name]["message"]}
        </p>
      )}
    </div>
  );
};

export default InputText;
