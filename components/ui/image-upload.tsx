"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = (props: ImageUploadProps) => {
  const { onChange, onRemove, values, disabled } = props;
  const [isMounted, setIsMounted] = useState(false);

  const onUpload = (value: any) => {
    onChange(value.info.secure_url);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((value) => (
          <div
            key={value}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                onClick={() => onRemove(value)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image src={value} className="object-cover" alt="Image" fill />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ltqk0rze">
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (
            <Button
              type="button"
              variant="secondary"
              onClick={handleOnClick}
              disabled={disabled}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
