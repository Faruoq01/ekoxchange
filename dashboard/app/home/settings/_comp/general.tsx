"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const generalSettingsSchema = z.object({
  platformName: z.string().min(2, "Platform name is required"),
  supportEmail: z.string().email("A valid support email is required"),
  supportPhone: z
    .string()
    .min(7, "Support phone is required")
    .regex(/^[+]?[\d\s()-]+$/, "Invalid phone number format"),
  statusBanner: z
    .string()
    .min(5, "Status banner is required")
    .max(500, "Cannot exceed 500 characters"),
  maintenanceMode: z.boolean(),
});

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export default function GeneralSettings() {
  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: "",
      supportEmail: "",
      supportPhone: "",
      statusBanner: "",
      maintenanceMode: false,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: GeneralSettingsFormValues) => {
    console.log("Submitted settings:", values);
  };

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

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              noValidate
            >
              {/* Platform Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Input value="Production" disabled className="font-medium" />
                  <p className="text-xs text-muted-foreground">Read-only</p>
                </div>

                <FormField
                  control={control}
                  name="platformName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter platform name"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="supportEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="support@example.com"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="supportPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="+1 (555) 000-0000"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status Banner */}
              <FormField
                control={control}
                name="statusBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Status Banner</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Message displayed at the top of the user dashboard"
                        className="min-h-[100px]"
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Visible to all users.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Maintenance Mode */}
              <FormField
                control={control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-semibold">
                        Maintenance Mode
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Disable user access except administrators.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
