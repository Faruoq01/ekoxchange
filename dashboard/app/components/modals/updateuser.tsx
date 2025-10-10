"use client";
import Image from "next/image";
import InputText from "../input_text";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormValues, registrationSchema } from "@/app/zod/user";
import { Dispatch, SetStateAction, useState } from "react";
import { CustomButton } from "../button";
import toast from "react-hot-toast";
import { UserService } from "@/app/lib/services/user";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setReload } from "@/app/lib/redux/slices/users";

const UpdateUser = ({
  setIsopen,
}: {
  setIsopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const selectedUser = useAppSelector((state) => state.users.user);
  const reload = useAppSelector((state) => state.users.reload);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: selectedUser?.firstname,
      lastname: selectedUser?.lastname,
      email: selectedUser?.email,
      phone: selectedUser?.phone,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { error, payload } = await UserService.updateUser(
      data,
      selectedUser?.id
    );
    setLoading(false);
    if (!error && payload) {
      setIsopen(false);
      dispatch(setReload(!reload));
      toast.success("User created Successfully!");
    }
  };

  return (
    <div className="w-[80%] md:max-w-[400px] bg-white px-[15px] py-[20px]">
      <div className="flex flex-row justify-between">
        <h2 className="text-sm font-[600] text-[#626262]">Update User</h2>
        <Image
          onClick={() => setIsopen(false)}
          src={"/home/close.svg"}
          width={25}
          height={25}
          alt={"icon"}
        />
      </div>

      <div className="w-full flex flex-col mt-[20px] space-y-[15px]">
        <InputText
          label="First Name"
          name="firstname"
          type="text"
          register={register}
          formErrors={errors}
          placeholder="Enter First Name"
        />
        <InputText
          label="Last Name"
          name="lastname"
          type="text"
          register={register}
          formErrors={errors}
          placeholder="Enter Last Name"
        />
        <InputText
          label="Email"
          name="email"
          type="text"
          register={register}
          formErrors={errors}
          placeholder="Enter Email"
        />
        <InputText
          label="Phone"
          name="phone"
          type="text"
          register={register}
          formErrors={errors}
          placeholder="Enter Phone Number"
        />
      </div>
      <div className="w-full flex flex-row justify-start">
        <CustomButton
          callback={handleSubmit(onSubmit)}
          isLoading={loading}
          style="min-w-[100px] bg-[#F36F2E] hover:bg-[#F36F2E] mt-[25px] rounded-[5px]"
          variant={"default"}
          title="Update User"
        />
      </div>
    </div>
  );
};

export default UpdateUser;
