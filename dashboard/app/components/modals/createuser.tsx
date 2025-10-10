"use client";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { UserService } from "@/app/lib/services/user";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setReload } from "@/app/lib/redux/slices/users";
import { ScrollArea } from "@/components/ui/scroll-area";
import Input from "../forms/input";
import Button from "../forms/button";
import Text from "../forms/text";
import { SelectComponent } from "../forms/select";
import { MultiSelect } from "../forms/multiselect";
import { RegistrationFormValues, registrationSchema } from "@/app/zod/register";
import InputText from "../forms/input";
import CustomButton from "../forms/custombut";
import { RoleService } from "@/app/lib/services/roles";
import { setRoles } from "@/app/lib/redux/slices/roles";

const CreateUser = ({
  setIsopen,
}: {
  setIsopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const reload = useAppSelector((state) => state.users.reload);
  const roleList = useAppSelector((state) => state.roles.roleList);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      roleIds: [],
    },
  });

  const onSubmit = async (data: any) => {
    if (
      data?.roleIds?.includes("super_admin_virtual_id") &&
      data?.roleIds?.length > 1
    ) {
      return toast.error(
        "When super admin role is selected, no other role should be added"
      );
    }
    const { error, payload } = await UserService.createUser(data);
    if (!error && payload) {
      setIsopen(false);
      dispatch(setReload(!reload));
      toast.success("User created Successfully!");
    }
  };

  const getRoleList = useCallback(async () => {
    const { error, payload } = await RoleService.getRoles(0, 100);
    if (!error && payload) {
      dispatch(setRoles(payload));
    }
  }, []);

  useEffect(() => {
    getRoleList();
  }, [getRoleList]);

  const rolesInput = () => {
    return roleList?.map((item: any) => {
      return {
        id: item?.name === "Super Admin" ? "super_admin_virtual_id" : item?.id,
        name: item?.name,
      };
    });
  };

  const roleSelect = rolesInput();
  return (
    <div className="w-[80%] md:max-w-[400px] bg-gray-50 px-[15px] py-[15px] shadow-md">
      <div className="flex flex-row justify-between">
        <h2 className="text-sm font-[600] text-[#000]">Create User</h2>
        <Image
          onClick={() => setIsopen(false)}
          src={"/close.svg"}
          width={25}
          height={25}
          alt={"icon"}
        />
      </div>
      <ScrollArea className="w-full h-[400px] mt-[20px]">
        <div className="flex flex-col space-y-[15px]">
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
            placeholder="Enter Phone"
          />
          <div className="w-full">
            <div className="font-semibold text-[12px] text-black text-left mb-[5px]">
              Gender
            </div>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <SelectComponent
                  title="Select Gender"
                  list={[
                    { id: "male", name: "Male" },
                    { id: "female", name: "Female" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                />
              )}
            />
          </div>

          <div className="w-full mb-[30px]">
            <div className="font-semibold text-[12px] text-black text-left mb-[5px]">
              Roles
            </div>
            <Controller
              control={control}
              name="roleIds"
              render={({ field }) => (
                <MultiSelect
                  title="Select Roles"
                  list={roleSelect}
                  value={Array.isArray(field.value) ? field.value : []}
                  onChange={field.onChange}
                  error={errors.roleIds?.message}
                />
              )}
            />
          </div>
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

export default CreateUser;
