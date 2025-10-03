"use client";

import Button from "../forms/button";
import Input from "../forms/input";
import Text from "../forms/text";

const LoginForm = () => {
  return (
    <div className="w-full md:w-1/2 bg-card-light dark:bg-card-dark p-8 sm:p-12 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto">
        <Text variant="heading">Login</Text>
        <Text variant="body" className="mb-8">
          Enter your credentials to access your account.
        </Text>

        <form className="space-y-6">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon="person"
            label="Username or Email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon="lock"
            label="Password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-primary bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <Text variant="label" className="ml-2">
                Remember me
              </Text>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Forgot your password?
            </a>
          </div>

          <Button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-transform transform hover:scale-105"
            type="submit"
          >
            Log in
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-2 bg-card-light dark:bg-card-dark text-sm text-text-light dark:text-text-dark absolute left-1/2 -translate-x-1/2">
              Or continue with
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="social">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Google Icon Path */}
              </svg>
              Google
            </Button>
            <Button variant="social">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Facebook Icon Path */}
              </svg>
              Facebook
            </Button>
          </div>

          <Text variant="body" className="mt-8 text-center">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
