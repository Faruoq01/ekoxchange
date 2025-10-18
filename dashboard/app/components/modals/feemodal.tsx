"use client";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputText from "../forms/input";
import CustomButton from "../forms/custombut";
import { SelectComponent } from "../forms/select";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { CryptoService } from "@/app/lib/services/crypto";
import { setCryptoList, setReloadFee } from "@/app/lib/redux/slices/crypto";

// ✅ Schema
const transactionSchema = z.object({
  transactionType: z.enum(["Buy", "Sell", "Send", "Swap"]),
  cryptoAsset: z.string().nonempty("Select a crypto asset"),
  isPercentage: z.boolean(),
  percentageAmount: z.string().min(0).optional(),
  fixedAmount: z.string().min(0).optional(),
  threshold: z.string().min(0, "Threshold must be greater than 0"),
  userLevel: z.string().nonempty("User level is required"),
  effectiveDate: z.string().min(1, { message: "Crypto asset is required" }),
});

export type TransactionRuleFormValues = z.infer<typeof transactionSchema>;

const CreateTransactionRule = ({
  setIsopen,
}: {
  setIsopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const cryptoList = useAppSelector((state) => state.crypto.cryptoList);
  const reloadFee = useAppSelector((state) => state.crypto.reloadFee);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionRuleFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: "Sell",
      cryptoAsset: "",
      isPercentage: true,
      percentageAmount: "5",
      fixedAmount: "0",
      threshold: "1000",
      userLevel: "Verified",
      effectiveDate: new Date().toISOString().split("T")[0],
    },
  });

  const isPercentage = watch("isPercentage");

  // ✅ Load Crypto List
  const getCryptoList = useCallback(async () => {
    const { error, payload } = await CryptoService.getCryptoAsset(0, 100);
    if (!error && payload) {
      const tokenLists = payload?.map((item: any) => ({
        id: item?._id,
        name: `${item?.name} ( ${item?.symbol} --> ${item?.chain?.name} )`,
      }));
      dispatch(setCryptoList(tokenLists));
    }
  }, [dispatch]);

  useEffect(() => {
    getCryptoList();
  }, [getCryptoList]);

  const onSubmit = async (data: TransactionRuleFormValues) => {
    // Enforce one type of amount
    if (
      data.isPercentage &&
      (!data.percentageAmount || parseFloat(data.percentageAmount) <= 0)
    ) {
      return toast.error("Enter a valid percentage amount");
    }
    if (
      !data.isPercentage &&
      (!data.fixedAmount || parseFloat(data.fixedAmount) <= 0)
    ) {
      return toast.error("Enter a valid fixed amount");
    }

    if (data.effectiveDate) {
      data.effectiveDate = new Date(data.effectiveDate)
        .toISOString()
        .split("T")[0];
    }

    const { error, payload } = await CryptoService.createFee(data);
    if (!error && payload) {
      setIsopen(false);
      dispatch(setReloadFee(!reloadFee));
      toast.success("Fee rule created successfully!");
    }
  };

  return (
    <div className="w-[85%] md:max-w-[420px] bg-gray-50 px-[15px] py-[15px] shadow-md rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm font-[600] text-[#000]">
          Create Transaction Rule
        </h2>
        <Image
          onClick={() => setIsopen(false)}
          src={"/close.svg"}
          width={25}
          height={25}
          alt={"close"}
          className="cursor-pointer"
        />
      </div>

      <ScrollArea className="w-full h-[400px] mt-[20px]">
        <div className="flex flex-col space-y-[15px]">
          {/* Transaction Type */}
          <Controller
            control={control}
            name="transactionType"
            render={({ field }) => (
              <SelectComponent
                title="Select Transaction Type"
                list={[
                  { id: "Buy", name: "Buy" },
                  { id: "Sell", name: "Sell" },
                  { id: "Send", name: "Send" },
                  { id: "Swap", name: "Swap" },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.transactionType?.message}
              />
            )}
          />

          {/* Crypto Asset */}
          <Controller
            control={control}
            name="cryptoAsset"
            render={({ field }) => (
              <SelectComponent
                title="Select Crypto Asset"
                list={cryptoList}
                value={field.value}
                onChange={field.onChange}
                error={errors.cryptoAsset?.message}
              />
            )}
          />

          {/* Amount Type Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Use Percentage
            </label>
            <input
              type="checkbox"
              {...register("isPercentage")}
              className="w-4 h-4 accent-purple-500"
            />
          </div>

          {/* Conditional Amount Inputs */}
          {isPercentage ? (
            <InputText
              label="Percentage Amount (%)"
              name="percentageAmount"
              type="number"
              register={register}
              formErrors={errors}
              placeholder="Enter percentage (e.g. 3)"
            />
          ) : (
            <InputText
              label="Fixed Amount"
              name="fixedAmount"
              type="number"
              register={register}
              formErrors={errors}
              placeholder="Enter fixed amount"
              bgColor="#fff"
            />
          )}

          {/* Threshold */}
          <InputText
            label="Threshold"
            name="threshold"
            type="number"
            register={register}
            formErrors={errors}
            placeholder="Enter threshold value"
            bgColor="#fff"
            className="bg-white"
          />

          {/* User Level */}
          <Controller
            control={control}
            name="userLevel"
            render={({ field }) => (
              <SelectComponent
                title="Select User Level"
                list={[
                  { id: "Basic", name: "Basic" },
                  { id: "Verified", name: "Verified" },
                  { id: "VIP", name: "VIP" },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.userLevel?.message}
              />
            )}
          />

          {/* ✅ Effective Date using shadcn DatePicker */}
          <Controller
            control={control}
            name="effectiveDate"
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value)
                : undefined;

              return (
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-semibold text-gray-700">
                    Effective Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal text-[12px]"
                      >
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        // convert Date → string when saving
                        onSelect={(date) =>
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.effectiveDate && (
                    <p className="text-red-600 text-[10px]">
                      {errors.effectiveDate.message as string}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>
      </ScrollArea>

      <div className="pt-[10px] flex justify-start">
        <CustomButton
          isLoading={isSubmitting}
          callback={() => handleSubmit(onSubmit)()}
          title="Proceed"
          icon="save"
          style="rounded-[0px] bg-purple-500"
        />
      </div>
    </div>
  );
};

export default CreateTransactionRule;
