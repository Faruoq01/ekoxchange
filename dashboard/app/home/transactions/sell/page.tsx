"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/lib/redux/controls";
import { SellOrder } from "@/app/lib/redux/interfaces/transaction";

const SellComponent = () => {
  const sellOrder = useAppSelector(
    (state) => state.transaction.singleSellOrder as SellOrder | null
  );

  if (!sellOrder) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-300">
        No sell order data available.
      </div>
    );
  }

  const seller = sellOrder.createdBy;
  const sellerName = `${seller.firstname} ${seller.lastname}`;
  const sellerAvatar = seller.avatar || `https://picsum.photos/200/200?2`;

  const shortenHash = (hash: string) =>
    hash ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : "N/A";

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[20px] pb-[50px]">
      {/* Left: Transaction Summary + Bank Details */}
      <div className="md:col-span-2 space-y-8">
        {/* Transaction Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Transaction Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <Info label="Amount to Pay" value={`$ ${sellOrder.amountToPay}`} />
            <Info
              label="Token Amount"
              value={`${sellOrder.selectedToken?.minimumTransaction || "N/A"} ${
                sellOrder.selectedToken?.symbol || ""
              }`}
            />
            <Info
              label="Unit Price"
              value={`$ ${sellOrder.unitPrice} / ${sellOrder.selectedToken?.symbol}`}
            />
            <Info
              label="Status"
              value={
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    sellOrder.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : sellOrder.status === "paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {sellOrder.status}
                </span>
              }
            />
            <Info
              label="Chain"
              value={sellOrder.selectedToken?.chain?.name || sellOrder.chain}
            />
            <Info
              label="Transaction Hash"
              value={shortenHash(sellOrder.txnHash)}
              mono
            />
            <Info label="Created At" value={formatDate(sellOrder.createdAt)} />
            <Info
              label="Last Updated"
              value={formatDate(sellOrder.updatedAt)}
            />
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Bank Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <Info label="Bank Name" value={sellOrder.bankName} />
            <Info label="Account Number" value={sellOrder.accountNumber} />
            <div className="sm:col-span-2">
              <Info label="Account Name" value={sellOrder.accountName} />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Seller Info + Actions */}
      <div className="space-y-8">
        {/* Seller Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Seller Information
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16">
              <Image
                src={sellerAvatar}
                alt={`${sellerName} avatar`}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-text-light-primary dark:text-text-dark-primary text-lg">
                {sellerName}
              </p>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary break-all">
                {seller.email}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Info label="Created By" value={sellerName} />
            <Info
              label="Updated By"
              value={sellOrder.updatedBy || "Admin (System)"}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Actions
          </h2>
          <div className="space-y-4">
            <button className="w-full flex text-[14px] items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              <span className="material-icons">check_circle</span>
              Mark as Paid
            </button>
            <button className="w-full flex text-[14px] items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              <span className="material-icons">cancel</span>
              Cancel Sell Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

const Info = ({ label, value, mono }: InfoProps) => (
  <div className="space-y-1">
    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
      {label}
    </p>
    <p
      className={`font-medium text-text-light-primary dark:text-text-dark-primary ${
        mono ? "font-mono text-sm truncate" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

export default SellComponent;
