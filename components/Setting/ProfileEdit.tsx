import React from "react";
import UploadImage from "./UploadImage";
import InputField from "./InputField";

interface ProfileEditProps {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  onChange: (field: string, value: string) => void;
  onImageChange: (file: File) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  name,
  email,
  password,
  jobTitle,
  onChange,
  onImageChange,
}) => {
  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg mb-3 font-semibold">Edit Profile Info</h2>

      <UploadImage label="Upload photo" onFileSelect={onImageChange} />

      <InputField
        label="Name"
        placeholder="Your name"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <InputField
        label="E-mail"
        placeholder="Your E-mail"
        type="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <InputField
        label="Password"
        placeholder="Your password"
        type="password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <InputField
        label="Job title"
        placeholder="Your job title"
        value={jobTitle}
        onChange={(e) => onChange("jobTitle", e.target.value)}
      />
    </div>
  );
};

export default ProfileEdit;
