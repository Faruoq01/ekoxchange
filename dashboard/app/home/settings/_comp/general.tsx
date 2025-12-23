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
import { Fragment, useCallback, useEffect, useState } from "react";
import { SettingsService } from "@/app/lib/services/settings";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
  const [general, setGeneral] = useState<any>({});
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (values: GeneralSettingsFormValues) => {
    setLoading(true);
    const { error, payload } =
      await SettingsService.saveAndUpdateGeneralSettings(values);
    setLoading(false);
    if (!error && payload) {
      setGeneral(payload);
      toast.success("General settings updated successfuly!");
    }
  };

  const getGeneralSettings = useCallback(async () => {
    const { error, payload } = await SettingsService.getGeneralSettings();
    if (!error && payload) {
      if (payload?.generalSettings) {
        setGeneral(payload?.generalSettings);
      }
    }
  }, []);

  useEffect(() => {
    getGeneralSettings();
  }, [getGeneralSettings]);

  useEffect(() => {
    if (Object.keys(general).length > 0) {
      form.setValue("platformName", general?.platformName);
      form.setValue("statusBanner", general?.statusBanner);
      form.setValue("supportEmail", general?.supportEmail);
      form.setValue("supportPhone", general?.supportPhone);
      form.setValue("maintenanceMode", general?.maintenanceMode);
    }
  }, [general]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="relative w-12 h-12"
        >
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
          <div className="absolute inset-2 rounded-full border-2 border-gray-200 dark:border-gray-700" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide"
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  return (
    <Fragment>
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
                    <Input
                      value="Production"
                      disabled
                      className="font-medium"
                    />
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
                <div className="flex justify-end border-t pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[140px]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
