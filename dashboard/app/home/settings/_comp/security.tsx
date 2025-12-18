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

const Security = () => {
  return (
    <div className="p-8 mb-[50px]">
      <h1 className="text-lg font-bold">Security Settings</h1>
      <p className="text-[12px] text-muted-foreground mb-8">
        Manage security protocols, access controls, and authentication policies
        for the platform.
      </p>

      <Card className="shadow-sm space-y-10">
        <CardHeader>
          <CardTitle>Authentication & Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-5 rounded-xl border border-border bg-muted flex items-center justify-between shadow-sm">
              <div>
                <Label htmlFor="2fa-toggle">Enforce 2FA</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Require Two-Factor Authentication for all admin accounts.
                </p>
              </div>
              <Switch id="2fa-toggle" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout Duration</Label>
              <Select defaultValue="15">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="60">60 Minutes</SelectItem>
                  <SelectItem value="120">2 Hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Automatically logout inactive admins after this period.
              </p>
            </div>
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Login Protection</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="max-attempts">Max Failed Login Attempts</Label>
            <Input
              id="max-attempts"
              type="number"
              defaultValue={3}
              min={1}
              max={10}
            />
            <p className="text-xs text-muted-foreground">
              Number of attempts before lockout.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lockout-duration">
              Account Lockout Duration (Minutes)
            </Label>
            <Input
              id="lockout-duration"
              type="number"
              defaultValue={30}
              min={5}
              max={1440}
            />
            <p className="text-xs text-muted-foreground">
              Time to wait before retrying login.
            </p>
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="ip-allowlist">Admin IP Allowlist</Label>
            <Badge variant="secondary">Recommended</Badge>
          </div>
          <Textarea
            id="ip-allowlist"
            placeholder={`192.168.1.1\n10.0.0.0/24`}
            rows={3}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter one IP address or CIDR range per line. Leave empty to allow
            all.
          </p>
        </CardContent>

        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
        </CardHeader>
        <CardContent className="p-6 rounded-xl border border-border bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="min-length">Minimum Length</Label>
              <Input
                id="min-length"
                type="number"
                defaultValue={12}
                min={8}
                max={32}
              />
            </div>
            <div className="space-y-4">
              <Label>Complexity Requirements</Label>
              <div className="grid grid-cols-2 gap-4">
                {["Uppercase", "Lowercase", "Numbers", "Symbols"].map(
                  (item) => (
                    <label key={item} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border border-border text-primary shadow-sm"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">
                        {item}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <div className="pt-6 flex justify-end border-t border-border">
          <Button type="submit">Save Security Settings</Button>
        </div>
      </Card>

      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="text-sm font-bold text-destructive uppercase tracking-wider mb-4 flex items-center gap-2">
          Danger Zone
        </h3>
        <Card className="bg-destructive/10 border-destructive/30 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Force Logout All Admins
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              This will invalidate all active sessions immediately. You will be
              logged out as well.
            </p>
          </div>
          <Button variant="destructive">Force Logout</Button>
        </Card>
      </div>
    </div>
  );
};

export default Security;
