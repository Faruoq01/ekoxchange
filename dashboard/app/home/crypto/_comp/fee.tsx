"use client";
import { Column } from "@/app/components/home/table";
import ConfirmModal from "@/app/components/modals/confirmation";
import { Modal } from "@/app/components/modals/modalskin";
import UpdateTransactionRule from "@/app/components/modals/updatefee";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setReloadFee, setSingleFee } from "@/app/lib/redux/slices/crypto";
import { CryptoService } from "@/app/lib/services/crypto";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

export interface Fee {
  id: number;
  transactionType: string;
  cryptoAsset: string;
  network: string;
  feeType: string;
  currentValue: string;
  appliedTo: string;
  lastModified: string;
  status: string;
  rawData: string;
}

// --- Status badge colors
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// --- Columns
export const feeColumns: Column<Fee>[] = [
  { key: "transactionType", header: "Transaction Type" },
  { key: "cryptoAsset", header: "Crypto Asset" },
  { key: "network", header: "Network" },
  { key: "feeType", header: "Fee Type" },
  { key: "currentValue", header: "Current Value" },
  { key: "appliedTo", header: "Applied To" },
  { key: "lastModified", header: "Last Modified" },
  {
    key: "status",
    header: "Status",
    render: (fee) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[fee.status]
        }`}
      >
        {fee.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Action",
    render: (user) => {
      const dispatch = useAppDispatch();
      const [editFee, setEditFee] = useState(false);
      const [deleteFee, setDeleteFee] = useState(false);
      const [loading, setLoading] = useState(false);
      const reloadFee = useAppSelector((state) => state.crypto.reloadFee);

      const handleFeeEdit = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleFee(data));
        setEditFee(true);
      };

      const handleDelete = async () => {
        const data = JSON.parse(user?.rawData);
        setLoading(true);
        const { error, payload } = await CryptoService.deleteFee(data?.id);
        setLoading(false);
        if (!error && payload) {
          setDeleteFee(false);
          dispatch(setReloadFee(!reloadFee));
          toast.success("Fee deleted successfully!");
        }
      };

      return (
        <Fragment>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
                title="Actions"
              >
                <span className="material-icons text-[20px]">more_vert</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="max-w-[150px] text-[12px]">
              <div
                onClick={handleFeeEdit}
                className="py-[6px] select-none border-b hover:bg-gray-50 px-[10px]"
              >
                Edit Fee
              </div>
              <div
                onClick={() => setDeleteFee(true)}
                className="py-[6px] select-none hover:bg-gray-50 px-[10px]"
              >
                Delete
              </div>
            </PopoverContent>
          </Popover>
          {editFee && (
            <Modal isOpen={editFee}>
              <UpdateTransactionRule setIsopen={setEditFee} />
            </Modal>
          )}
          {deleteFee && (
            <Modal isOpen={deleteFee}>
              <ConfirmModal
                title="Delete Record!"
                message="This record would be deleted permanently and this action cannot be undone."
                confirmText="Yes, Reset"
                loading={loading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteFee(false)}
              />
            </Modal>
          )}
        </Fragment>
      );
    },
  },
];
