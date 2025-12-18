"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  return (
    <div className="p-8 mb-[50px] space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Notifications Settings
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            Manage system alerts, delivery channels, and admin recipients.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <span className="material-icons-outlined text-lg">send</span>
          Send Test Notification
        </Button>
      </div>

      {/* Delivery Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary">
              campaign
            </span>
            Delivery Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Email", icon: "mail", color: "blue" },
            { title: "SMS", icon: "smartphone", color: "green" },
            { title: "Webhooks", icon: "webhook", color: "purple" },
          ].map((channel) => (
            <Card
              key={channel.title}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2.5 bg-${channel.color}-100 dark:bg-${channel.color}-900/40 text-${channel.color}-600 dark:text-${channel.color}-400 rounded-lg shadow-sm`}
                >
                  <span className="material-icons-outlined">
                    {channel.icon}
                  </span>
                </div>
                <Switch />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {channel.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                {channel.title === "Email" &&
                  "Send comprehensive alerts and reports to registered admin email addresses."}
                {channel.title === "SMS" &&
                  "Urgent alerts delivered directly to admin mobile numbers via Twilio."}
                {channel.title === "Webhooks" &&
                  "Push real-time event JSON payloads to configured external URLs (e.g., Slack)."}
              </p>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Triggers Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons-outlined text-primary">tune</span>
              Triggers Configuration
            </CardTitle>
            <Badge>System Level</Badge>
          </CardHeader>
          <CardContent className="divide-y divide-gray-100 dark:divide-gray-700">
            {[
              {
                title: "Large Transaction Alerts",
                desc: "Triggers when value > $50,000",
              },
              {
                title: "Failed Transactions",
                desc: "Notify on 3+ consecutive failures",
              },
              {
                title: "Suspicious Activity",
                desc: "IP mismatch or unusual login locations",
              },
              {
                title: "System Errors",
                desc: "Server 500 errors and API timeouts",
              },
              {
                title: "KYC Review Needed",
                desc: "Documents pending manual approval",
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
                name: "Faruk Aminu",
                email: "faruk@eko.com",
                initials: "FA",
                bg: "indigo",
              },
              {
                name: "Jane Doe",
                email: "jane@eko.com",
                initials: "JD",
                bg: "emerald",
              },
              {
                name: "Security Mgr",
                email: "sec@eko.com",
                initials: "SM",
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
              Add New Admin
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-4">
        <Button variant="outline">Discard Changes</Button>
        <Button>Save Configuration</Button>
      </div>
    </div>
  );
};

export default Notifications;
