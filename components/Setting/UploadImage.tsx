import React, { useRef, useState } from "react";
import Image from "next/image";

interface UploadImageProps {
  label: string;
  onFileSelect: (file: File) => void; // new prop
}

const UploadImage: React.FC<UploadImageProps> = ({ label, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file); // send file to parent
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div
        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-[#BDBDBD] border rounded-full cursor-pointer overflow-hidden"
        onClick={handleImageClick}
      >
        {previewUrl ? (
          <Image src={previewUrl} alt="Preview" width={64} height={64} />
        ) : (
          <Image src="/photo.png" alt="Upload" width={24} height={24} />
        )}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
