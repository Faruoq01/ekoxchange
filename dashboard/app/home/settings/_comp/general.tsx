"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GeneralSettings() {
  const [appName, setAppName] = useState("My Awesome App");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border border-border/40">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            General Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* App Name */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="appName">App Name</Label>
            <Input
              id="appName"
              placeholder="Enter app name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
          </div>

          {/* Default Currency */}
          <div className="grid gap-2 w-full">
            <Label>Default Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timezone */}
          <div className="grid gap-2">
            <Label>Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                <SelectItem value="Europe/London">Europe/London</SelectItem>
                <SelectItem value="America/New_York">
                  America/New_York
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Maintenance Mode */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <Label className="font-medium">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily disable user access for maintenance.
              </p>
            </div>
            <Switch checked={maintenance} onCheckedChange={setMaintenance} />
          </div>

          <div className="pt-4">
            <Button className="w-full md:w-auto">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
