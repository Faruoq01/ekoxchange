"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/lib/redux/controls";
import CustomButton from "../forms/custombut";

interface DeleteModalProps {
  setIsopen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  message?: string;
  onDelete: () => Promise<{ error?: boolean; payload?: any }>;
  refreshHandler?: any;
  reloadState?: boolean;
}

const DeleteModal = ({
  setIsopen,
  title,
  message,
  onDelete,
  refreshHandler,
  reloadState,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error, payload } = await onDelete();
      if (!error && payload) {
        toast.success("Deleted successfully!");
        dispatch(refreshHandler(!reloadState));
        setIsopen(false);
      } else {
        toast.error("Failed to delete, try again!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] md:max-w-[400px] bg-white px-[15px] py-[20px] rounded-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm font-[600] text-[#E53935]">
          {title || "Delete Confirmation"}
        </h2>
        <Image
          onClick={() => setIsopen(false)}
          src={"/close.svg"}
          width={25}
          height={25}
          alt={"close icon"}
          className="cursor-pointer"
        />
      </div>

      <div className="mt-[20px] text-sm text-[#444]">
        {message ||
          "Are you sure you want to delete this item? This action cannot be undone."}
      </div>

      <div className="flex flex-row justify-end space-x-[10px] mt-[25px]">
        <CustomButton
          isLoading={loading}
          callback={() => setIsopen(false)}
          style="w-[100px] bg-gray-600 hover:bg-gray-500 text-[14px] font-[700] rounded-[5px]"
          icon="cancel"
          title="Cancel"
        />
        <CustomButton
          callback={handleDelete}
          isLoading={loading}
          style="w-[100px] bg-[#E53935] hover:bg-[#d32f2f] text-[14px] font-[700] rounded-[5px]"
          icon="save"
          title="Delete"
        />
      </div>
    </div>
  );
};

export default DeleteModal;
