"use client";

const SellComponent = () => {
  return (
    <div className="grid grid-cols-3 gap-[20px] pb-[50px]">
      <div className="col-span-2 space-y-8">
        <div className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Transaction Summary
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Amount to Pay
              </p>
              <p className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
                $ 120,500.00
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Token Amount
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                100 USDT
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Unit Price
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                $ 1,205.00 / USDT
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Status
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  Awaiting Payment
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Chain
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                TRC20
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Transaction Hash
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary font-mono text-sm truncate">
                0x123...abc
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Created At
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                Oct 4, 2025, 09:15 AM
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Last Updated
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                Oct 4, 2025, 09:15 AM
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Bank Details
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Bank Name
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                First Bank of Nigeria
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Account Number
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                3045678901
              </p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Account Name
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                John Doe
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 space-y-8">
        <div className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Seller Information
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <img
              alt="John Doe avatar"
              className="w-16 h-16 rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1y5Q_KINXF3A82l9-FI6ymTm-g_JtozAtNmrG6T2reLmJuqOb7ezNfTYwTw8eA_i8KHNxGT0YfSBi5cusJaREa0lVHniLfpRAcch5Wz14bBPAtR-iq49H-V7p7lxwXUKb6CW-JrLm6cSToq1vJr-v_fPN1Y-aUUWHYPefC8m3BiOFihBJA2VaeyVsB1SHiZTCmbaIacMXhrGSxISSZ_vS72ZooZqPKS4KdxGvL9F00UHQSSeu8Ravd4r8g4KToHy6WOD8I6vTt6n"
            />
            <div>
              <p className="font-semibold text-text-light-primary dark:text-text-dark-primary text-lg">
                John Doe
              </p>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                johndoe@example.com
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Created By
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                John Doe
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Updated By
              </p>
              <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                Admin (Faruk Aminu)
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
          <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-6">
            Actions
          </h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              <span className="material-icons">check_circle</span>
              Mark as Paid
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              <span className="material-icons">cancel</span>
              Cancel Sell Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellComponent;
