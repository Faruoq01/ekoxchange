"use client";

import { motion } from "framer-motion";
import { UploadCloud, ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { SettingsService } from "@/app/lib/services/settings";

/* -------------------------------------------------------------------------- */
/* Schema */
/* -------------------------------------------------------------------------- */

const schema = z.object({
  enabled: z.boolean(),
  imageUrl: z.url("Banner image is required"),
});

type FormValues = z.infer<typeof schema>;

/* -------------------------------------------------------------------------- */
/* Component */
/* -------------------------------------------------------------------------- */

export default function AdBannerSettings() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      enabled: true,
      imageUrl: "",
    },
  });

  const enabled = watch("enabled");
  const imageUrl = watch("imageUrl");

  /* -------------------------------------------------------------------------- */
  /* Fetch existing banner on mount */
  /* -------------------------------------------------------------------------- */
  const fetchBanner = useCallback(async () => {
    const { error, payload } = await SettingsService.getBanner();
    if (!error && payload) {
      setValue("enabled", payload.status === "active", {
        shouldDirty: false,
      });
      console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${payload.path}`, "llll");
      setValue(
        "imageUrl",
        `${process.env.NEXT_PUBLIC_BASE_URL}${payload.path}`,
        {
          shouldDirty: false,
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchBanner();
  }, [setValue]);

  /* -------------------------------------------------------------------------- */
  /* Image Upload */
  /* -------------------------------------------------------------------------- */
  const handleFileChange = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("status", String(enabled));

      const res = await fetch("http://localhost:4000/banner/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setValue("imageUrl", data.path, { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Submit Banner Settings */
  /* -------------------------------------------------------------------------- */
  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      if (fileInputRef.current?.files?.[0]) {
        formData.append("file", fileInputRef.current.files[0]);
      }
      formData.append("status", String(data.enabled));

      await fetch("http://localhost:4000/banner/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl"
    >
      <Card className="p-6 rounded-2xl space-y-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ad Banner</h2>
            <p className="text-sm text-muted-foreground">
              Control the promotional banner shown on the dashboard.
            </p>
          </div>

          <Controller
            name="enabled"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <Badge variant={field.value ? "default" : "secondary"}>
                  {field.value ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>

        <Separator />

        {/* Current Banner */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Current Banner</h3>

          {imageUrl ? (
            <div className="rounded-xl border bg-muted/20 p-4">
              <img
                src={imageUrl}
                alt="Banner preview"
                className="mx-auto max-h-44 rounded-lg object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              No banner uploaded
            </div>
          )}

          {errors.imageUrl && (
            <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Upload */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Upload New Banner</h3>

          <div
            onClick={() => enabled && fileInputRef.current?.click()}
            className={`rounded-xl border border-dashed p-6 text-center transition
              ${
                enabled
                  ? "cursor-pointer hover:border-primary"
                  : "opacity-50 cursor-not-allowed"
              }
            `}
          >
            {uploading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP • Recommended 1200×300
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
          />
        </div>

        {/* Actions */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
