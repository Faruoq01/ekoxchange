"use client";

import { motion } from "framer-motion";
import { UploadCloud, ImageIcon } from "lucide-react";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

/* -------------------------------------------------------------------------- */
/*                               Schema                                       */
/* -------------------------------------------------------------------------- */

const schema = z.object({
  enabled: z.boolean(),
  imageUrl: z.string().url("Banner image is required"),
});

type FormValues = z.infer<typeof schema>;

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

export default function AdBannerSettings() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      imageUrl: "", // existing banner URL can be fetched & set here
    },
  });

  const imageUrl = watch("imageUrl");

  /* ----------------------------- Cloudinary Upload ----------------------------- */

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleFileChange = async (file: File) => {
    const url = await uploadToCloudinary(file);
    setValue("imageUrl", url, { shouldValidate: true });
  };

  /* ----------------------------- Submit to API ----------------------------- */

  const onSubmit = async (data: FormValues) => {
    await fetch("/api/settings/ad-banner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <motion.section
      key="ads"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mb-[50px]"
    >
      <Card className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-heading-light dark:text-heading-dark">
              Ad Banner Settings
            </h2>
            <p className="text-[12px] text-text-light dark:text-text-dark">
              Manage dashboard promotional banners.
            </p>
          </div>

          <Controller
            name="enabled"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Badge variant={field.value ? "default" : "secondary"}>
                  {field.value ? "Enabled" : "Disabled"}
                </Badge>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>

        {/* Existing Banner */}
        <div className="space-y-2">
          <h3 className="font-medium">Current Banner</h3>

          {imageUrl ? (
            <div className="rounded-xl border p-4 bg-muted/30">
              <img
                src={imageUrl}
                alt="Banner preview"
                className="max-h-44 mx-auto rounded-lg object-contain"
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
          <h3 className="font-medium">Upload Banner</h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-xl border border-dashed p-6 flex flex-col items-center justify-center text-center hover:border-primary transition"
          >
            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP • Recommended 1200×300
            </p>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
