"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CryptoNotifications = () => {
  return (
    <div className="p-8 mb-[50px] space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Crypto Notification Settings
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            Customize alerts for trades, wallet activity, fees, and market
            rates.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <span className="material-icons-outlined text-lg">
            notifications_active
          </span>
          Send Test Notification
        </Button>
      </div>

      {/* Triggers Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons-outlined text-primary">tune</span>
              Trade & Wallet Alerts
            </CardTitle>
            <Badge>User Level</Badge>
          </CardHeader>
          <CardContent className="divide-y divide-gray-100 dark:divide-gray-700">
            {[
              {
                title: "Buy Completed",
                desc: "Notify when a crypto purchase is successful",
              },
              {
                title: "Sell Completed",
                desc: "Notify when a crypto sale is successful",
              },
              {
                title: "Send/Receive",
                desc: "Alerts on incoming or outgoing wallet transfers",
              },
              {
                title: "Swap Executed",
                desc: "Notify when a token swap is completed",
              },
              {
                title: "Rate Changes",
                desc: "Notify when BTC, ETH or selected tokens change by >5%",
              },
              {
                title: "Fee Updates",
                desc: "Alerts when network or trading fees change significantly",
              },
            ].map((trigger) => (
              <div
                key={trigger.title}
                className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {trigger.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {trigger.desc}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="link" size="sm">
                    Configure
                  </Button>
                  <Switch />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recipients */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons-outlined text-primary">
                people
              </span>
              Recipients
            </CardTitle>
            <Button
              variant="link"
              size="sm"
              className="flex items-center gap-1"
            >
              <span className="material-icons-outlined text-sm">add</span> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              {
                name: "Alice Crypto",
                email: "alice@crypto.com",
                initials: "AC",
                bg: "indigo",
              },
              {
                name: "Bob Trader",
                email: "bob@crypto.com",
                initials: "BT",
                bg: "emerald",
              },
              {
                name: "Charlie Wallet",
                email: "charlie@crypto.com",
                initials: "CW",
                bg: "pink",
              },
            ].map((recipient) => (
              <div
                key={recipient.email}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 group`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-${recipient.bg}-100 text-${recipient.bg}-600 dark:bg-${recipient.bg}-900/30 dark:text-${recipient.bg}-400 flex items-center justify-center text-xs font-bold`}
                  >
                    {recipient.initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {recipient.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {recipient.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <span className="material-icons-outlined text-lg">close</span>
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-2 flex items-center justify-center gap-2 text-xs"
            >
              <span className="material-icons-outlined text-sm">
                person_add
              </span>{" "}
              Add New Recipient
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-4">
        <Button variant="outline">Discard Changes</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default CryptoNotifications;
