"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GeneralSettings() {
  return (
    <div className="p-8 mb-[50px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-bold">General Settings</h1>
        <Badge
          variant="secondary"
          className="gap-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          System Operational
        </Badge>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Platform Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Input
                id="environment"
                value="Production"
                disabled
                className="font-medium"
              />
              <p className="text-xs text-muted-foreground">Read-only</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="Eko Exchange" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                defaultValue="support@eko"
                // className="border-red-500 focus-visible:ring-red-500"
              />
              {/* <p className="text-xs text-red-500">
                Please enter a valid email address.
              </p> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-phone">Support Phone</Label>
              <Input id="support-phone" placeholder="+1 (555) 000-0000" />
            </div>

            <div className="space-y-2">
              <Label>Default Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">
                    UTC (Coordinated Universal Time)
                  </SelectItem>
                  <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                  <SelectItem value="est">
                    EST (Eastern Standard Time)
                  </SelectItem>
                  <SelectItem value="pst">
                    PST (Pacific Standard Time)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="jp">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-banner">Platform Status Banner</Label>
            <Textarea
              id="status-banner"
              placeholder="Enter a message to be displayed on the user dashboard..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Visible to all users at the top of their dashboard.
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground">
                Disable user access except administrators.
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
