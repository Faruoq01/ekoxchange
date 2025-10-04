"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../forms/button";
import Input from "../forms/input";
import Text from "../forms/text";
import { loginSchema, LoginSchema } from "@/app/zod/login";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/lib/services/auth";
import { useAppDispatch } from "@/app/lib/redux/controls";
import { setIsLogin, setUser } from "@/app/lib/redux/slices";
import toast from "react-hot-toast";
import { AppPages } from "@/app/assets/appages";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const { error, payload } = await AuthService.login(data);
    if (!error && payload) {
      dispatch(setUser(payload));
      dispatch(setIsLogin(true));
      toast.success("User Authenticated Successfully!");
      router.push(AppPages.home.dashboard);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-card-light dark:bg-card-dark p-8 sm:p-12 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto">
        <Text variant="heading">Login</Text>
        <Text variant="body" className="mb-8">
          Enter your credentials to access your account.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Username or Email"
            placeholder="you@example.com"
            icon="person"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            icon="lock"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
            <div className="text-sm font-medium select-none text-primary hover:text-primary/80">
              Forgot your password?
            </div>
          </div>

          <Button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-0 transition-transform transform hover:scale-105"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
