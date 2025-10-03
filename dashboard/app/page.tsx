"use client";

export default function Home() {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <div className="w-full h-full flex overflow-hidden">
        <div className="hidden md:flex w-1/2 gradient-bg p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-white/10 rounded-full"></div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-full">
                <span className="material-icons text-white">
                  currency_bitcoin
                </span>
              </div>
              <span className="text-2xl font-bold">Eko Xchange</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Welcome to the Future of Crypto Trading.
            </h1>
            <p className="text-white/80">
              Securely buy, trade, and hold cryptocurrencies.
            </p>
          </div>
          <div className="text-sm text-white/60">
            © 2023 Eko Xchange. All rights reserved.
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-card-light dark:bg-card-dark p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-heading-light dark:text-heading-dark mb-2">
              Login
            </h2>
            <p className="text-text-light dark:text-text-dark mb-8">
              Enter your credentials to access your account.
            </p>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  htmlFor="email"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark">
                    person
                  </span>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-3 rounded-lg text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary transition"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark">
                    lock
                  </span>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-3 rounded-lg text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary transition"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-primary bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label
                    className="ml-2 block text-sm text-text-light dark:text-text-dark"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    className="font-medium text-primary hover:text-primary/80"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <a
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-card-light dark:bg-card-dark text-sm font-medium text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    href="#"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                      <path d="M1 1h22v22H1z" fill="none"></path>
                    </svg>
                    Google
                  </a>
                </div>
                <div>
                  <a
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-card-light dark:bg-card-dark text-sm font-medium text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    href="#"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
              <p className="mt-8 text-center text-sm text-text-light dark:text-text-dark">
                Don't have an account?
                <a
                  className="font-medium text-primary hover:text-primary/80"
                  href="#"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
