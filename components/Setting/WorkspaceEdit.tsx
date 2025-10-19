import React from "react";
import UploadImage from "./UploadImage";

interface Props {
  workspaceName: string;
  description: string;
  onChange: (field: string, value: string) => void;
  onLogoChange: (file: File | null) => void;
}

const WorkspaceEdit: React.FC<Props> = ({
  workspaceName,
  description,
  onChange,
  onLogoChange,
}) => {
  return (
    <div className="w-full max-w-md p-2">
      <h2 className="text-lg mb-4">Edit Workspace Info</h2>

      <UploadImage label="Upload logo" onFileSelect={onLogoChange} />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
        <input
          className="w-full p-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="The name of your organisation"
          value={workspaceName}
          onChange={(e) => onChange("workspaceName", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description about your organization"
          rows={5}
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default WorkspaceEdit;
