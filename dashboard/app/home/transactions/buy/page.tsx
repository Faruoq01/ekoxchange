"use client";
import Image from "next/image";

export default function BuyComponent() {
  return (
    <main className="flex-1 pb-[50px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-6">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Status", value: "Pending", badge: true },
                { label: "Amount to Pay", value: "₦250,000.00" },
                { label: "Token Amount", value: "100,000 USDT" },
                { label: "Unit Price", value: "₦2.50 / USDT" },
                { label: "USD Price", value: "$250.00" },
                { label: "Selected Token", value: "Tether (USDT)" },
                { label: "Created At", value: "Oct 4, 2025, 09:15 AM" },
                { label: "Last Updated", value: "Oct 4, 2025, 09:18 AM" },
              ].map(({ label, value, badge }) => (
                <div key={label}>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                    {label}
                  </p>
                  {badge ? (
                    <span className="px-2.5 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      {value}
                    </span>
                  ) : (
                    <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Buyer Information */}
          <section className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-6">Buyer Information</h2>
            <div className="flex items-center gap-4">
              <Image
                alt="John Doe avatar"
                width={64}
                height={64}
                className="rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1y5Q_KINXF3A82l9-FI6ymTm-g_JtozAtNmrG6T2reLmJuqOb7ezNfTYwTw8eA_i8KHNxGT0YfSBi5cusJaREa0lVHniLfpRAcch5Wz14bBPAtR-iq49H-V7p7lxwXUKb6CW-JrLm6cSToq1vJr-v_fPN1Y-aUUWHYPefC8m3BiOFihBJA2VaeyVsB1SHiZTCmbaIacMXhrGSxISSZ_vS72ZooZqPKS4KdxGvL9F00UHQSSeu8Ravd4r8g4KToHy6WOD8I6vTt6n"
              />
              <div>
                <p className="font-semibold text-lg">John Doe</p>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">
                  johndoe@example.com
                </p>
              </div>
            </div>
          </section>

          {/* Bank Details */}
          <section className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-6">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Bank Name", value: "First Bank of Nigeria" },
                { label: "Account Name", value: "John Olumide Doe" },
                { label: "Account Number", value: "3045678901" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                    {label}
                  </p>
                  <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Actions */}
          <section className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <span className="material-icons">send</span>
                Transfer Tokens
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                <span className="material-icons">check_circle</span>
                Mark as Completed
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
                <span className="material-icons">cancel</span>
                Cancel Transaction
              </button>
            </div>
          </section>

          {/* Transaction Receipt */}
          <section className="bg-white dark:bg-gray-800 dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-4">Transaction Receipt</h2>
            <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <Image
                alt="Transaction receipt"
                width={400}
                height={300}
                className="rounded-md w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxLAUfIzJyUClq0Oux_RNIWAFoMDCweeM9XVxP7MztCY6LHdYXv_62-P3O-KyKa85cOKxO6x6cZuKC3vgNUNYmo_r1hqtZtMlbgIv6e1i7HR1komjZu_3hVUXII_4Gqc9DkiQQVZ_hVNVkRer__wjrr9QaRlLMww0ifIDHKxvpG-2Fb0EU5ocPx5iMxQLRLnFN4ooUnnkdEgVTFttmuZ8GrMHbiiTI31TZALwStwk94QctDxMgqoE3PHKGd4T1q-72HAeFENazYl6z"
              />
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium"
              >
                <span className="material-icons">download</span>
                Download Receipt
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
