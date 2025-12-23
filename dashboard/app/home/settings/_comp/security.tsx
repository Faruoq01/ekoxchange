"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { SettingsService } from "@/app/lib/services/settings";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const securitySchema = z.object({
  enforce2FA: z.boolean(),

  sessionTimeout: z.string().min(1, "Session timeout is required"),

  maxFailedAttempts: z
    .number()
    .int()
    .min(1, "Minimum is 1")
    .max(10, "Maximum is 10"),

  lockoutDuration: z
    .number()
    .int()
    .min(5, "Minimum is 5 minutes")
    .max(1440, "Maximum is 1440 minutes"),

  minPasswordLength: z
    .number()
    .int()
    .min(8, "Minimum length is 8")
    .max(32, "Maximum length is 32"),

  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumbers: z.boolean(),
  requireSymbols: z.boolean(),
});

type SecurityFormValues = z.infer<typeof securitySchema>;

/* -------------------------------------------------------------------------- */
/*                           Typed field definitions                           */
/* -------------------------------------------------------------------------- */

const passwordRequirements: {
  name: keyof Pick<
    SecurityFormValues,
    | "requireUppercase"
    | "requireLowercase"
    | "requireNumbers"
    | "requireSymbols"
  >;
  label: string;
}[] = [
  { name: "requireUppercase", label: "Uppercase" },
  { name: "requireLowercase", label: "Lowercase" },
  { name: "requireNumbers", label: "Numbers" },
  { name: "requireSymbols", label: "Symbols" },
];

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export default function Security() {
  const [security, setSecurity] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    shouldUnregister: false,
    defaultValues: {
      enforce2FA: false,
      sessionTimeout: "30",
      maxFailedAttempts: 3,
      lockoutDuration: 30,
      minPasswordLength: 12,
      requireUppercase: false,
      requireLowercase: false,
      requireNumbers: false,
      requireSymbols: false,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (values: SecurityFormValues) => {
    setLoading(true);
    const { error, payload } =
      await SettingsService.saveAndUpdateSecuritySettings(values);
    setLoading(false);
    if (!error && payload) {
      setSecurity(payload);
      toast.success("Security settings updated successfuly!");
    }
  };

  const getSecuritySettings = useCallback(async () => {
    const { error, payload } = await SettingsService.getSecuritySettings();
    if (!error && payload) {
      if (payload?.securitySettings) {
        setSecurity(payload?.securitySettings);
      }
    }
  }, []);

  useEffect(() => {
    getSecuritySettings();
  }, [getSecuritySettings]);

  useEffect(() => {
    if (Object.keys(security).length > 0) {
      form.setValue("enforce2FA", security?.enforce2FA);
      form.setValue("lockoutDuration", security?.lockoutDuration);
      form.setValue("maxFailedAttempts", security?.maxFailedAttempts);
      form.setValue("minPasswordLength", security?.minPasswordLength);
      form.setValue("requireLowercase", security?.requireLowercase);
      form.setValue("requireNumbers", security?.requireNumbers);
      form.setValue("requireSymbols", security?.requireSymbols);
      form.setValue("requireUppercase", security?.requireUppercase);
      form.setValue("sessionTimeout", security?.sessionTimeout);
    }
  }, [security]);

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
    <div className="p-8 mb-[50px]">
      <h1 className="text-lg font-bold">Security Settings</h1>
      <p className="text-xs text-muted-foreground mb-8">
        Manage authentication, sessions, and access policies.
      </p>

      <Card className="shadow-sm">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Authentication & Sessions */}
            <CardHeader>
              <CardTitle>Authentication & Sessions</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={control}
                name="enforce2FA"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border p-5 bg-muted">
                    <div>
                      <FormLabel>Enforce 2FA</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Require two-factor authentication for admins.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="sessionTimeout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Timeout</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 Minutes</SelectItem>
                          <SelectItem value="30">30 Minutes</SelectItem>
                          <SelectItem value="60">60 Minutes</SelectItem>
                          <SelectItem value="120">2 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Login Protection */}
            <CardHeader>
              <CardTitle>Login Protection</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={control}
                name="maxFailedAttempts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Failed Login Attempts</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lockoutDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lockout Duration (Minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Password Policy */}
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 rounded-xl border bg-muted/50 p-6 mx-[20px]">
              <FormField
                control={control}
                name="minPasswordLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Password Length</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {passwordRequirements.map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <FormLabel className="text-sm">{label}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>

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
      </Card>
    </div>
  );
}
