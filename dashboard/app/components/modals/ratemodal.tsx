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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// ✅ Schema validation
const cryptoRateSchema = z.object({
  cryptoAsset: z.string().nonempty("Select a crypto asset"),
  buyRate: z
    .number()
    .min(0, "Buy rate must be a positive number")
    .or(z.nan().transform(() => 0)),
  sellRate: z
    .number()
    .min(0, "Sell rate must be a positive number")
    .or(z.nan().transform(() => 0)),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  description: z.string().optional(),
});

export type CryptoRateFormValues = z.infer<typeof cryptoRateSchema>;

const CreateCryptoRate = ({
  setIsopen,
}: {
  setIsopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const cryptoList = useAppSelector((state) => state.crypto.cryptoList);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CryptoRateFormValues>({
    resolver: zodResolver(cryptoRateSchema),
    defaultValues: {
      cryptoAsset: "",
      buyRate: 0,
      sellRate: 0,
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  // ✅ Fetch crypto asset list
  const getCryptoList = useCallback(async () => {
    // const { error, payload } = await CryptoService.getCryptoAssets(0, 100);
    // if (!error && payload) {
    //   dispatch(setCryptoList(payload));
    // }
  }, [dispatch]);

  useEffect(() => {
    getCryptoList();
  }, [getCryptoList]);

  const cryptoSelect = cryptoList?.map((item: any) => ({
    id: item.id,
    name: item.symbol ? `${item.name} (${item.symbol})` : item.name,
  }));

  // ✅ Submit handler
  const onSubmit = async (data: CryptoRateFormValues) => {
    if (data.sellRate > data.buyRate) {
      return toast.error("Sell rate cannot be higher than buy rate");
    }

    // const { error, payload } = await CryptoService.createCryptoRate(data);
    // if (!error && payload) {
    //   setIsopen(false);
    //   toast.success("Crypto rate configuration created successfully!");
    // }
  };

  return (
    <div className="w-[85%] md:max-w-[420px] bg-gray-50 px-[15px] py-[15px] shadow-md rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-sm font-[600] text-[#000]">Create Crypto Rate</h2>
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
          {/* Crypto Asset */}
          <Controller
            control={control}
            name="cryptoAsset"
            render={({ field }) => (
              <SelectComponent
                title="Select Crypto Asset"
                list={cryptoSelect ?? []}
                value={field.value}
                onChange={field.onChange}
                error={errors.cryptoAsset?.message}
              />
            )}
          />

          {/* Buy Rate */}
          <InputText
            label="Buy Rate"
            name="buyRate"
            type="number"
            register={register}
            formErrors={errors}
            placeholder="Enter buy rate"
          />

          {/* Sell Rate */}
          <InputText
            label="Sell Rate"
            name="sellRate"
            type="number"
            register={register}
            formErrors={errors}
            placeholder="Enter sell rate"
          />

          {/* ✅ Start Date (Shadcn Calendar) */}
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value)
                : undefined;
              return (
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-semibold text-gray-700">
                    Start Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal text-[12px]"
                      >
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Select start date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && (
                    <p className="text-red-600 text-[10px]">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* ✅ End Date (Shadcn Calendar) */}
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value)
                : undefined;
              return (
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-semibold text-gray-700">
                    End Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal text-[12px]"
                      >
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Select end date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-red-600 text-[10px]">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Description */}
          <InputText
            label="Description"
            name="description"
            type="text"
            register={register}
            formErrors={errors}
            placeholder="Enter description (optional)"
          />
        </div>
      </ScrollArea>

      <div className="pt-[10px] flex justify-start">
        <CustomButton
          isLoading={isSubmitting}
          callback={handleSubmit(onSubmit)}
          title="Proceed"
          icon="save"
          style="rounded-[0px] bg-purple-500"
        />
      </div>
    </div>
  );
};

export default CreateCryptoRate;
