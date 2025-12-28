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
import { SettingsService } from "@/app/lib/services/settings";
import toast from "react-hot-toast";

/* ---------------------------- Schema ---------------------------- */
const schema = z.object({
  enabled: z.boolean(),
  imageUrl: z.string().url("Banner image is required"),
});

type FormValues = z.infer<typeof schema>;

/* ---------------------------- Component ---------------------------- */
export default function AdBannerSettings() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  /* ---------------------------- Fetch existing banner ---------------------------- */
  const fetchBanner = useCallback(async () => {
    const { error, payload } = await SettingsService.getBanner();
    if (!error && payload) {
      setValue("enabled", payload.status === "active", { shouldDirty: false });
      setValue(
        "imageUrl",
        `${process.env.NEXT_PUBLIC_BASE_URL}${payload.path}`,
        { shouldDirty: false }
      );
    }
  }, [setValue]);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  /* ---------------------------- Form Submit ---------------------------- */
  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      alert("Please select a banner image");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("status", String(data.enabled));

      const { error, payload } = await SettingsService.saveBanner(formData);

      if (!error && payload) {
        const bannerUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${payload.path}`;
        setValue("imageUrl", bannerUrl, { shouldValidate: true });

        // Reset selected file for future uploads
        setSelectedFile(null);

        toast.success("Banner uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload banner");
    } finally {
      setUploading(false);
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

        {/* Current Banner / Selected File */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Current Banner</h3>

          {selectedFile ? (
            <div className="rounded-xl border bg-muted/20 p-4 text-center">
              <p className="text-sm font-medium">
                Selected file:{" "}
                <span className="font-semibold">{selectedFile.name}</span>
              </p>
            </div>
          ) : imageUrl ? (
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
          <h3 className="text-sm font-medium">Select New Banner</h3>

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
                <p className="text-sm font-medium">Click to select image</p>
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
              if (file) setSelectedFile(file);
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
