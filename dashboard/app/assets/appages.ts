export class AppPages {
  static auth = {
    login: "/",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  };

  static home = {
    dashboard: "/home/dashboard",
    users: {
      index: "/home/users",
      account: "/home/users/account",
    },
    crypto: "/home/crypto",
    transactions: "/home/transactions",
    analytics: "/home/analytics",
    support: "/home/support",
    roles: "/home/roles",
    giftcards: "/home/giftcards",
    referrals: "/home/referrals",
    settings: "/home/settings",
  };
}
