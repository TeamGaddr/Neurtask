import React, { useImperativeHandle, forwardRef, useState } from "react"
// THIs IS A STATIC PAGE

const Members = forwardRef((props, ref) => {
  const [teamMembers, setTeamMembers] = useState([
    { name: "Tom", role: "Finance Manager", created: "4 weeks ago", lastActive: "Today" },
    { name: "Sal", role: "Sales Director", created: "4 weeks ago", lastActive: "Today" },
    { name: "Lisa", role: "Marketing Manager", created: "4 weeks ago", lastActive: "Yesterday" },
    { name: "Georgia", role: "HR Director", created: "8 weeks ago", lastActive: "Tues 14th Jan" },
  ]);

  // Just "save" data locally — no API call
  const handleSubmit = async () => {
    console.log("Saving Members tab data locally...");
    // For example, save to localStorage
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    console.log("Team members saved locally:", teamMembers);
    // You can expand this to whatever local save logic you want
  };

  // Expose handleSubmit to parent (SettingsPage)
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div>
      <div className="space-y-2 mb-6">
        <h1 className="text-lg font-medium text-[#292929]">Team members settings</h1>
        <p className="text-base text-[#7C7C7C]">Control team access and permissions</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Name</th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Role</th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Created</th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Last Active</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 px-4">{member.name}</td>
                <td className="py-4 px-4">{member.role}</td>
                <td className="py-4 px-4">{member.created}</td>
                <td className="py-4 px-4">{member.lastActive}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-start">
                    <button className="p-1 text-gray-500" aria-label="View member details">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Members;
