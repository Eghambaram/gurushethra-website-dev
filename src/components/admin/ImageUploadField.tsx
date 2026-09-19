"use client";
import { useState, useTransition, type ChangeEvent } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { uploadImage } from "@/app/admin/actions";

interface ImageUploadFieldProps {
  name: string;
  label: string;
  defaultValue?: string;
  captureDimensions?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  recommendedSize?: string;
}

export function ImageUploadField({
  name,
  label,
  defaultValue,
  captureDimensions,
  defaultWidth,
  defaultHeight,
  recommendedSize,
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [dims, setDims] = useState<{ width?: number; height?: number }>({ width: defaultWidth, height: defaultHeight });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) setError(result.error);
      else if (result.url) {
        setUrl(result.url);
        if (captureDimensions) setDims({ width: result.width, height: result.height });
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-300">{label}</label>
        {recommendedSize && <span className="text-[11px] text-gray-600">Recommended: {recommendedSize}</span>}
      </div>

      {url && (
        <div className="relative w-32 aspect-square rounded-lg overflow-hidden border border-white/10 bg-brand-surface-2">
          <Image src={url} alt="" fill sizes="128px" className="object-cover" unoptimized />
        </div>
      )}

      <input type="hidden" name={name} value={url} />
      {captureDimensions && (
        <>
          <input type="hidden" name={`${name}_width`} value={dims.width ?? ""} />
          <input type="hidden" name={`${name}_height`} value={dims.height ?? ""} />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isPending}
        className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded file:border-0 file:bg-brand-gold file:text-brand-background file:font-semibold file:text-xs file:uppercase file:tracking-wide file:cursor-pointer cursor-pointer disabled:opacity-60"
      />

      {isPending && (
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          Uploading…
        </span>
      )}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
