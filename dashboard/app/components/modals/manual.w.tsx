"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/redux/controls";
import { BuyOrder } from "@/app/lib/redux/interfaces/transaction";
import { AppEnv } from "@/app/lib/env";
import { useCallback, useEffect, useState } from "react";
import { TransactionService } from "@/app/lib/services/transaction";

const transferSchema = z.object({
  fromAddress: z.string().min(1, "Sender address is required"),
  toAddress: z
    .string()
    .startsWith("0x", "Wallet address must start with 0x")
    .length(42, "Wallet address must be 42 characters long"),
  amount: z.string().min(1, "Invalid amount"),
});

type TransferFormData = z.infer<typeof transferSchema>;

interface TokenTransferModalContentProps {
  onClose?: () => void;
  onConfirm?: (data: any) => void;
}

export const TokenTransferModalContent = ({
  onClose,
  onConfirm,
}: TokenTransferModalContentProps) => {
  const [gasFee, setGasFee] = useState(0);
  const buyOrder = useAppSelector(
    (state) => state.transaction.singleBuyOrder as BuyOrder | null
  );

  const tokenSymbol: any = buyOrder?.selectedToken?.chainCode;
  const fromAddress = FROM_TOKEN_MAP[tokenSymbol];

  const TO_TOKEN_MAP: any = {
    BTC: buyOrder?.createdBy?.bitcoinAddress,
    ETH: buyOrder?.createdBy?.ethereumAddress,
    SOL: buyOrder?.createdBy?.solanaAddress,
    TRX: buyOrder?.createdBy?.tronAddress,
    "USDC-ERC20": buyOrder?.createdBy?.ethereumAddress,
    "USDT-ERC20": buyOrder?.createdBy?.ethereumAddress,
    "USDT-TRC20": buyOrder?.createdBy?.tronAddress,
  };
  const toAddress = TO_TOKEN_MAP[tokenSymbol];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAddress: fromAddress,
      toAddress: toAddress,
      amount: buyOrder?.amountToPay,
    },
  });

  const onSubmit = async (data: TransferFormData) => {
    const param = {
      chain: buyOrder?.selectedToken?.tokenType,
      tokenAddress: buyOrder?.selectedToken?.contractAddress,
      recipient: toAddress,
      tokenName: buyOrder?.selectedToken?.name,
      tokenSymbol: buyOrder?.selectedToken?.symbol,
      amount: buyOrder?.amountToPay,
      decimals: buyOrder?.selectedToken?.decimals,
    };

    const { error, payload } = await TransactionService.manualWithdrawal(param);
    if (!error && payload) {
      onConfirm?.(param);
    }
  };

  const getGasEstimate = useCallback(async () => {
    if (gasFee > 0) return;
    const param = {
      chain: buyOrder?.selectedToken?.tokenType,
      tokenAddress: buyOrder?.selectedToken?.contractAddress,
      recipient: toAddress,
      amount: buyOrder?.amountToPay,
      decimals: buyOrder?.selectedToken?.decimals,
    };
    const { error, payload } = await TransactionService.gasEstimate(param);
    if (!error && payload) {
      setGasFee(Number(payload));
    }
  }, []);

  useEffect(() => {
    getGasEstimate();
  }, [getGasEstimate]);

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl w-full max-w-2xl transform transition-all overflow-hidden flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="px-[30px] py-[20px] border-b border-border-light dark:border-border-dark">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Initiate Token Transfer
            </h2>
            <p className="text-[12px] text-gray-600 dark:text-gray-400">
              Confirm details before sending tokens.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close"
          >
            <span className="material-icons !text-2xl">close</span>
          </button>
        </div>
      </div>

      {/* Form Body */}
      <form
        id="transferForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
      >
        {/* Token Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Image
              alt="token logo"
              width={40}
              height={40}
              className="rounded-full"
              src={buyOrder?.selectedToken?.logo || ""}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {`${buyOrder?.selectedToken?.name} (${buyOrder?.selectedToken?.symbol})`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {buyOrder?.selectedToken?.chain?.name}
              </p>
            </div>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              {`${buyOrder?.amountToPay} ${buyOrder?.selectedToken?.symbol}`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ~ ₦
              {(
                Number(buyOrder?.amountToPay) *
                Number(buyOrder?.selectedToken?.rate?.sellRate)
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* From Address */}
        <div>
          <label
            htmlFor="fromAddress"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            From Token Address
          </label>
          <input
            id="fromAddress"
            {...register("fromAddress")}
            readOnly
            className="block w-full text-[12px] rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mt-1 px-3 py-3 focus:ring-primary focus:border-primary"
          />
          {errors.fromAddress && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fromAddress.message}
            </p>
          )}
        </div>

        {/* To Address */}
        <div>
          <label
            htmlFor="toAddress"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            To User Address
          </label>
          <input
            id="toAddress"
            {...register("toAddress")}
            readOnly
            placeholder="Enter recipient's wallet address"
            className="block w-full text-[12px] rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 mt-1 px-3 py-3 focus:ring-primary focus:border-primary"
          />
          {errors.toAddress && (
            <p className="text-sm text-red-500 mt-1">
              {errors.toAddress.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Amount to Transfer
          </label>
          <div className="relative">
            <input
              id="amount"
              {...register("amount")}
              readOnly
              placeholder="0.00"
              className="block w-full text-[12px] rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 pr-12 text-gray-700 dark:text-gray-200 mt-1 px-3 py-3 focus:ring-primary focus:border-primary"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 text-sm">
              {buyOrder?.selectedToken?.symbol}
            </span>
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Fee + Warning */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Estimated Network Fee:
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {gasFee} ETH (~${gasFee * Number(buyOrder?.usdPrice)})
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 p-3 rounded-lg flex items-start gap-3 text-sm">
            <span className="material-icons !text-base mt-0.5">
              warning_amber
            </span>
            <span>
              Please double-check the recipient's address. Transactions on the
              blockchain are irreversible.
            </span>
          </div>
        </div>
      </form>

      {/* Fixed Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row-reverse gap-3">
        <button
          type="submit"
          form="transferForm"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-primary text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Processing..." : "Confirm Transfer"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2.5 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Static map for platform token pool addresses
const FROM_TOKEN_MAP: any = {
  BTC: AppEnv.poolAccount.bitcoin,
  ETH: AppEnv.poolAccount.ethereum,
  SOL: AppEnv.poolAccount.solana,
  TRX: AppEnv.poolAccount.tron,
  "USDC-ERC20": AppEnv.poolAccount.ethereum,
  "USDT-ERC20": AppEnv.poolAccount.ethereum,
  "USDT-TRC20": AppEnv.poolAccount.tron,
};
