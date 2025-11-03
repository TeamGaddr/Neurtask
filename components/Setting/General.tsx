import React, { forwardRef, useImperativeHandle, useState } from "react";
import ProfileEdit from "./ProfileEdit";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const General = forwardRef((props, ref) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    jobTitle: "",
    workspaceName: "",
    description: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [workspaceLogo, setWorkspaceLogo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (field: string, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(state).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profileImage) formData.append("profileImage", profileImage);
      if (workspaceLogo) formData.append("workspaceLogo", workspaceLogo);

      const token = localStorage.getItem("token"); // Or sessionStorage.getItem
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ4MDE3OTVmZTI4ODgyZThiZjdiMGUiLCJlbWFpbCI6InRlc3R1c2VyNEBleGFtcGxlLmNvbSIsImlhdCI6MTc1MDA2MzU0OSwiZXhwIjoxNzUwMDY3MTQ5fQ.GfOJV-tXxQMOnT1mqaeB8a5ZjF5panyJNe0-nfrbdUk";

      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(`${API_BASE}/api/auth/update`, {
        method: "PUT",
        body: formData, // No need to set Content-Type manually
        headers,
        // credentials: "include", // Needed if your backend uses cookies/sessions
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("All information updated successfully!");
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("An error occurred while updating");
    }
  };
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileEdit
          name={state.name}
          email={state.email}
          password={state.password}
          jobTitle={state.jobTitle}
          onChange={handleChange}
          onImageChange={setProfileImage}
        />
        {/* <WorkspaceEdit
          workspaceName={state.workspaceName}
          description={state.description}
          onChange={handleChange}
          onLogoChange={setWorkspaceLogo}
        /> */}
      </div>

      {/* Removed the manual Update button */}

      {message && <p className="mt-3 text-sm text-center">{message}</p>}
    </div>
  );
});

General.displayName = 'General';

export default General;
