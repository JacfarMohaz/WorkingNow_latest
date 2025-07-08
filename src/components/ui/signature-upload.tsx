"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, FileImage, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SignatureUploadProps {
  label?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export function SignatureUpload({
  label = "Upload Signature",
  value,
  onChange,
  className,
  disabled = false,
  required = false,
}: SignatureUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL when file changes
  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      onChange?.(file);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleRemove = useCallback(() => {
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <Label className="flex items-center gap-2 text-sm font-medium">
          <PenTool className="w-4 h-4 text-primary" />
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      <div className="space-y-3">
        {/* Upload Area */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer",
            "hover:border-primary/50 hover:bg-muted/20",
            isDragOver && "border-primary bg-primary/5",
            value && "border-green-500/50 bg-green-50 dark:bg-green-950/20",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={disabled ? undefined : handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            {value ? (
              <>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <FileImage className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">
                    File uploaded successfully
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {value.name}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-muted rounded-full">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {isDragOver ? "Drop your signature here" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Remove button */}
          {value && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Preview Section */}
        {previewUrl && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Preview:
            </Label>
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Signature preview"
                className="max-w-full h-auto max-h-32 rounded border bg-background object-contain"
              />
              {!disabled && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 