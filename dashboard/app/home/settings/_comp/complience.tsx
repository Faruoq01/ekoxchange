"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import RichTextEditor from "./editor";

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const complianceSchema = z.object({
  termsPublished: z.boolean(),
  termsContent: z
    .string()
    .min(10, "Terms & Conditions must be at least 10 characters"),

  privacyPublished: z.boolean(),
  privacyContent: z
    .string()
    .min(10, "Privacy Policy must be at least 10 characters"),

  riskPublished: z.boolean(),
  riskContent: z
    .string()
    .min(10, "Risk Disclosure must be at least 10 characters"),

  amlPublished: z.boolean(),
  amlContent: z
    .string()
    .min(10, "AML Compliance must be at least 10 characters"),
});

type ComplianceFormValues = z.infer<typeof complianceSchema>;

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

export default function Compliance() {
  const form = useForm<ComplianceFormValues>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      termsPublished: true,
      termsContent: "",
      privacyPublished: true,
      privacyContent: "",
      riskPublished: true,
      riskContent: "",
      amlPublished: true,
      amlContent: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: ComplianceFormValues) => {
    console.log("Compliance form data:", data);
  };

  const docs = [
    {
      key: "terms",
      title: "Terms & Conditions",
      icon: "gavel",
      version: "v2.4",
      updated: "Oct 24, 2023",
      contentField: "termsContent" as const,
      publishedField: "termsPublished" as const,
      color: "blue" as const,
    },
    {
      key: "privacy",
      title: "Privacy Policy",
      icon: "policy",
      version: "v1.8",
      updated: "Nov 02, 2023",
      contentField: "privacyContent" as const,
      publishedField: "privacyPublished" as const,
      color: "purple" as const,
    },
    {
      key: "risk",
      title: "Risk Disclosure",
      icon: "warning",
      updated: "Sep 12, 2023",
      contentField: "riskContent" as const,
      publishedField: "riskPublished" as const,
      color: "orange" as const,
    },
    {
      key: "aml",
      title: "AML Compliance",
      icon: "verified_user",
      updated: "Aug 05, 2023",
      contentField: "amlContent" as const,
      publishedField: "amlPublished" as const,
      color: "emerald" as const,
    },
  ];

  const COLOR_STYLES: Record<
    "blue" | "purple" | "orange" | "emerald",
    { bg: string; text: string }
  > = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 mb-[50px]">
      {docs.map((doc) => {
        const styles = COLOR_STYLES[doc.color];

        return (
          <Card key={doc.key} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div
                    className={`w-10 h-10 rounded-lg ${styles.bg} ${styles.text} flex items-center justify-center`}
                  >
                    <span className="material-icons-outlined">{doc.icon}</span>
                  </div>
                  <div>
                    <CardTitle>{doc.title}</CardTitle>
                    {doc.version && (
                      <Badge variant="secondary">{doc.version}</Badge>
                    )}
                    <span className="text-xs text-muted-foreground ml-2">
                      Updated: {doc.updated}
                    </span>
                  </div>
                </div>

                <Controller
                  control={control}
                  name={doc.publishedField}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
              <Controller
                control={control}
                name={doc.contentField}
                render={({ field }) => (
                  <div className="rounded-xl flex-1">
                    <RichTextEditor
                      defaultValue={field.value}
                      onEditorChange={field.onChange}
                    />

                    {errors[doc.contentField] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[doc.contentField]?.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </CardContent>
          </Card>
        );
      })}

      {/* ------------------------------------------------------------------ */}
      {/*                         Global Actions                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="submit">Save All Changes</Button>
      </div>
    </form>
  );
}
