"use client";
import ConfirmModal from "@/app/components/modals/confirmation";
import { TokenTransferModalContent } from "@/app/components/modals/manual.w";
import { Modal } from "@/app/components/modals/modalskin";
import { useAppSelector } from "@/app/lib/redux/controls";
import { BuyOrder } from "@/app/lib/redux/interfaces/transaction";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function BuyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [cancel, setCancel] = useState(false);
  const buyOrder = useAppSelector(
    (state) => state.transaction.singleBuyOrder as BuyOrder | null
  );

  if (!buyOrder || Object.keys(buyOrder).length === 0) {
    return (
      <main className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-lg bg-white px-[10px] py-[10px] rounded-full text-[12px]">
          No transaction data available.
        </p>
      </main>
    );
  }

  const {
    status,
    amountToPay,
    usdPrice,
    unitPrice,
    selectedToken,
    createdAt,
    updatedAt,
    accountName,
    accountNumber,
    bankName,
    transactionReceipt,
    createdBy,
  } = buyOrder;

  const buyer = createdBy;
  const buyerName = `${buyer?.firstname || "Unknown"} ${
    buyer?.lastname || ""
  }`.trim();
  const buyerEmail = buyer?.email || "No email provided";
  const buyerAvatar = buyer?.avatar || `https://picsum.photos/200/200?2`;

  // Helper function
  const formatDate = (timestamp: number) =>
    timestamp ? new Date(timestamp)?.toLocaleString("en-US") : "N/A";

  return (
    <Fragment>
      <main className="flex-1 pb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold mb-6">
                Transaction Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Status", value: status, badge: true },
                  {
                    label: "Amount to Pay",
                    value: `${
                      Number(amountToPay).toLocaleString() +
                      " " +
                      selectedToken?.symbol
                    }`,
                  },
                  { label: "USD Price", value: `$${usdPrice}` },
                  {
                    label: "Unit Price",
                    value: unitPrice ? `$${unitPrice}` : "N/A",
                  },
                  {
                    label: "Selected Token",
                    value: selectedToken
                      ? `${selectedToken?.name} (${selectedToken?.symbol})`
                      : "N/A",
                  },
                  { label: "Created At", value: formatDate(createdAt) },
                  { label: "Last Updated", value: formatDate(updatedAt) },
                ].map(({ label, value, badge }) => (
                  <div key={label}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {label}
                    </p>
                    {badge ? (
                      <span
                        className={`px-2.5 py-1 text-sm font-medium rounded-full ${
                          status === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : status === "failed"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {value}
                      </span>
                    ) : (
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Buyer Information */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold mb-6">Buyer Information</h2>
              <div className="flex items-center gap-4">
                <Image
                  alt={`${buyerName} avatar`}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                  src={buyerAvatar}
                />
                <div>
                  <p className="font-semibold text-lg">{buyerName}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {buyerEmail}
                  </p>
                </div>
              </div>
            </section>

            {/* Bank Details */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold mb-6">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Bank Name", value: bankName },
                  { label: "Account Name", value: accountName },
                  { label: "Account Number", value: accountNumber },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {label}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Actions */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full text-[14px] flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition"
                >
                  <span className="material-icons text-[14px]">send</span>
                  Transfer Tokens
                </button>
                <button
                  onClick={() => setCancel(true)}
                  className="w-full flex text-[14px] items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  <span className="material-icons">cancel</span>
                  Cancel Transaction
                </button>
              </div>
            </section>

            {/* Transaction Receipt */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h2 className="text-lg font-semibold mb-4">
                Transaction Receipt
              </h2>
              <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                {transactionReceipt ? (
                  <>
                    <Image
                      alt="Transaction receipt"
                      width={400}
                      height={300}
                      className="rounded-md w-full object-cover"
                      src={transactionReceipt}
                    />
                    <a
                      href={transactionReceipt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium"
                    >
                      <span className="material-icons">download</span>
                      View / Download Receipt
                    </a>
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No receipt uploaded.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Modal isOpen={isOpen}>
        <TokenTransferModalContent
          onClose={() => setIsOpen(false)}
          onConfirm={(data) => console.log("Confirmed:", data)}
        />
      </Modal>
      <Modal isOpen={cancel}>
        <ConfirmModal
          onCancel={() => setCancel(false)}
          onConfirm={() => console.log("Confirmed working")}
        />
      </Modal>
    </Fragment>
  );
}
