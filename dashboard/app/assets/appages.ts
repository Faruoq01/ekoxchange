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
      message: "/home/users/message",
    },
    crypto: "/home/crypto",
    transactions: {
      index: "/home/transactions",
      buy: "/home/transactions/buy",
      sell: "/home/transactions/sell",
    },
    analytics: "/home/analytics",
    support: "/home/support",
    roles: {
      index: "/home/roles",
      create: "/home/roles/create",
      edit: "/home/roles/edit",
    },
    giftcards: "/home/giftcards",
    referrals: "/home/referrals",
    settings: "/home/settings",
  };
}
